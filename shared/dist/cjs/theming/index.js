"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theming = void 0;
var Theming = /** @class */ (function () {
    function Theming(_theming) {
        this._theming = _theming;
        this.WIDGET_ID = 'uniswap__716283642843643826';
    }
    /**
     * Theme component
     */
    Theming.prototype.apply = function () {
        var css = '<style>';
        css += this.themeBackgroundColors();
        css += this.themeTextColors();
        css += this.themePanelColors();
        css += this.themeButtonColors();
        css += '<style>';
        document.head.insertAdjacentHTML('beforeend', css);
    };
    /**
     * Theme background colors
     */
    Theming.prototype.themeBackgroundColors = function () {
        var _a;
        if ((_a = this._theming) === null || _a === void 0 ? void 0 : _a.backgroundColor) {
            return ".uni-ic__theme-background {background: " + this._theming.backgroundColor + " !important}";
        }
        return '';
    };
    /**
     * Theme text colours
     */
    Theming.prototype.themeTextColors = function () {
        var _a;
        if ((_a = this._theming) === null || _a === void 0 ? void 0 : _a.textColor) {
            return ".uni-ic,\n              .uni-ic__modal,\n              .uni-ic__modal button:not(.uni-ic__theme-background-button),\n              svg\n              {color: " + this._theming.textColor + " !important}";
        }
        return '';
    };
    /**
     * Theme button colours
     */
    Theming.prototype.themeButtonColors = function () {
        var _a, _b, _c, _d;
        var css = '';
        if ((_b = (_a = this._theming) === null || _a === void 0 ? void 0 : _a.button) === null || _b === void 0 ? void 0 : _b.backgroundColor) {
            css += "background: " + this._theming.button.backgroundColor + " !important; ";
        }
        if ((_d = (_c = this._theming) === null || _c === void 0 ? void 0 : _c.button) === null || _d === void 0 ? void 0 : _d.textColor) {
            css += "color: " + this._theming.button.textColor + " !important";
        }
        if (css.length > 0) {
            return ".uni-ic__theme-background-button,\n              .uni-ic__settings-transaction-slippage-option.selected,\n              .uni-ic__settings-interface-multihops-actions-off.selected\n              {" + css + "}";
        }
        return css;
    };
    /**
     * Theme panel colours
     */
    Theming.prototype.themePanelColors = function () {
        var _a, _b, _c, _d;
        var css = '';
        if ((_b = (_a = this._theming) === null || _a === void 0 ? void 0 : _a.panel) === null || _b === void 0 ? void 0 : _b.backgroundColor) {
            css += "background: " + this._theming.panel.backgroundColor + " !important; border-color: " + this._theming.backgroundColor + " !important; ";
        }
        if ((_d = (_c = this._theming) === null || _c === void 0 ? void 0 : _c.panel) === null || _d === void 0 ? void 0 : _d.textColor) {
            css += "color: " + this._theming.panel.textColor + " !important";
        }
        if (css.length > 0) {
            return ".uni-ic__theme-panel {" + css + "}";
        }
        return css;
    };
    /**
     * Toggle showing and hiding the settings
     */
    Theming.prototype.toggleSettings = function () {
        var settingsElement = document.getElementsByClassName('uni-ic__settings-container')[0];
        if (settingsElement.classList.contains('uni-ic-hidden')) {
            settingsElement.classList.remove('uni-ic-hidden');
        }
        else {
            settingsElement.classList.add('uni-ic-hidden');
            this.apply();
        }
    };
    /**
     * Show the token selector
     */
    Theming.prototype.showTokenSelector = function () {
        this.hideSettings();
        var modal = document.getElementById('uni-ic__modal-token');
        modal.style.display = 'block';
        this.renderModalWithCorrectPosition(modal, 100);
    };
    /**
     * Hide the token selector
     */
    Theming.prototype.hideTokenSelector = function () {
        var modal = document.getElementById('uni-ic__modal-token');
        modal.style.display = 'none';
    };
    /**
     * Show the confirm swap modal
     */
    Theming.prototype.showConfirmSwap = function () {
        this.hideSettings();
        var modal = document.getElementById('uni-ic__modal-confirm-swap');
        modal.style.display = 'block';
        this.renderModalWithCorrectPosition(modal, 200);
    };
    /**
     * Hide the confirm swap modal
     */
    Theming.prototype.hideConfirmSwap = function () {
        var modal = document.getElementById('uni-ic__modal-confirm-swap');
        modal.style.display = 'none';
    };
    /**
     * Show the transaction
     */
    Theming.prototype.showTransaction = function () {
        var modal = document.getElementById('uni-ic__modal-transaction');
        modal.style.display = 'block';
        this.renderModalWithCorrectPosition(modal);
    };
    /**
     * Hide the transaction
     */
    Theming.prototype.hideTransaction = function () {
        var modal = document.getElementById('uni-ic__modal-transaction');
        modal.style.display = 'none';
    };
    /**
     * Hide the settings
     */
    Theming.prototype.hideSettings = function () {
        var settingsElement = document.getElementsByClassName('uni-ic__settings-container')[0];
        settingsElement.classList.add('uni-ic-hidden');
    };
    /**
     * render the modal in the correct place so it doesnt appear of screen
     */
    Theming.prototype.renderModalWithCorrectPosition = function (modal, minus) {
        if (minus === void 0) { minus = 0; }
        var topBoundingClientRect = document
            .getElementById(this.WIDGET_ID)
            .getBoundingClientRect().top;
        var paddingNumber = topBoundingClientRect - minus;
        if (paddingNumber < 20) {
            paddingNumber = 20;
        }
        var paddingTop = paddingNumber.toString() + 'px';
        modal.style.paddingTop = paddingTop;
    };
    return Theming;
}());
exports.Theming = Theming;
