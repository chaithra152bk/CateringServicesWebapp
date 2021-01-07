import * as actions from "./action-types";

export function showMessage(apiResponse, messageType) {
    return {
        type: actions.SHOW_MESSAGE,
        messageType: messageType,
        apiResponse: apiResponse
    };
}

export function hideMessage() {
    return {
        type: actions.HIDE_MESSAGE
    };
}
