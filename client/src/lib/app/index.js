import { createContext } from "react"

export const DispatchContext = createContext()
export const StateContext = createContext()

export {default as AppReducer} from './reducers/AppReducer'