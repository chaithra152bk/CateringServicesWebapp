
export const profile = (state=[], action) =>
{   
    switch(action.type)
    {
    case 'EDIT_CURRENT_USER':
        return (
            {
                user: action.user
            }
        );

        default:
        return state;
    }   
};