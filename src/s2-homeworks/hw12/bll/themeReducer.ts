const initState = {
    themeId: 1,
}

export type RootState = {
    theme: ThemeStateType;
};

export type ThemeStateType = {
    themeId: number;
};

export type ChangeThemeIdActionType = ReturnType<typeof changeThemeId>

export type ActionsType = ChangeThemeIdActionType;

export const themeReducer = (state: ThemeStateType = initState, action: ActionsType): ThemeStateType => { // fix any
    switch (action.type) {
        // дописать
        case 'SET_THEME_ID':
            return {...state, themeId: action.id}
        default:
            return state
    }
}

export const changeThemeId = (id: number) => ({type: 'SET_THEME_ID', id}) as const // fix any
