import * as React from "react"
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 5000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const ToastContext = React.createContext<{
  state: State
  dispatch: React.Dispatch<Action>
  addToRemoveQueue: (toastId: string) => void
} | undefined>(undefined)

const initialState: State = {
  toasts: [],
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const toastTimeouts = React.useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const addToRemoveQueue = React.useCallback((toastId: string) => {
    if (toastTimeouts.current.has(toastId)) {
      return
    }

    const timeout = setTimeout(() => {
      toastTimeouts.current.delete(toastId)
      dispatch({
        type: "REMOVE_TOAST",
        toastId: toastId,
      })
    }, TOAST_REMOVE_DELAY)

    toastTimeouts.current.set(toastId, timeout)
  }, [])

  React.useEffect(() => {
    return () => {
      toastTimeouts.current.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [])

  const value = React.useMemo(() => ({
    state,
    dispatch,
    addToRemoveQueue
  }), [state, addToRemoveQueue])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

type Toast = Omit<ToasterToast, "id">

function createToast({ ...props }: Toast) {
  return {
    id: genId(),
    dismiss: () => {},
    update: () => {},
  }
}

export function useToast() {
  const context = React.useContext(ToastContext)
  
  if (context === undefined) {
    return {
      toasts: [],
      toast: createToast,
      dismiss: () => {},
    }
  }

  const { state, dispatch, addToRemoveQueue } = context

  const toast = React.useCallback(
    ({ ...props }: Toast) => {
      const id = genId()

      const update = (props: ToasterToast) =>
        dispatch({
          type: "UPDATE_TOAST",
          toast: { ...props, id },
        })

      const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) {
              dismiss()
              if (addToRemoveQueue) addToRemoveQueue(id)
            }
          },
        },
      })

      return {
        id: id,
        dismiss,
        update,
      }
    },
    [dispatch, addToRemoveQueue]
  )

  return {
    toasts: state.toasts,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export const toast = createToast;
