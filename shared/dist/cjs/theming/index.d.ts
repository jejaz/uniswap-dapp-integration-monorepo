import { UniswapTheming } from './models/uniswap-theming';
export declare class Theming {
    private _theming?;
    private readonly WIDGET_ID;
    constructor(_theming?: UniswapTheming | undefined);
    /**
     * Theme component
     */
    apply(): void;
    /**
     * Theme background colors
     */
    private themeBackgroundColors;
    /**
     * Theme text colours
     */
    private themeTextColors;
    /**
     * Theme button colours
     */
    private themeButtonColors;
    /**
     * Theme panel colours
     */
    private themePanelColors;
    /**
     * Toggle showing and hiding the settings
     */
    toggleSettings(): void;
    /**
     * Show the token selector
     */
    showTokenSelector(): void;
    /**
     * Hide the token selector
     */
    hideTokenSelector(): void;
    /**
     * Show the confirm swap modal
     */
    showConfirmSwap(): void;
    /**
     * Hide the confirm swap modal
     */
    hideConfirmSwap(): void;
    /**
     * Show the transaction
     */
    showTransaction(): void;
    /**
     * Hide the transaction
     */
    hideTransaction(): void;
    /**
     * Hide the settings
     */
    hideSettings(): void;
    /**
     * render the modal in the correct place so it doesnt appear of screen
     */
    private renderModalWithCorrectPosition;
}
