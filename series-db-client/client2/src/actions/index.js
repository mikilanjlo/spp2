import {RERENDER_HEADER} from "../constants/index";

export function rerenderHeader(payload) {
    return {
        type: RERENDER_HEADER,
        payload
    }
}