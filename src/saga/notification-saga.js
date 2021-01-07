export const SHOW_NOTIFICATION = 'notification/SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'notification/HIDE_NOTIFICATION';

export function showNotification(error) {
    return {
        type: SHOW_NOTIFICATION,
        payload: error
    };
}

export function hideNotification(error) {
    return {
        type: HIDE_NOTIFICATION,
        payload: error
    };
}

const initialState = {
    data: {
        message: '',
        isShow: false
    }
};

export function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            {
                return {
                    ...state,
                    data: {
                        message: action.payload,
                        isShow: true
                    }
                };
            }

        case HIDE_NOTIFICATION:
            {
                return {
                    ...state,
                    data: {
                        message: "",
                        isShow: false
                    }
                };
            }
    }
    return state;
}