/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewEncapsulation, HostBinding } from '@angular/core';
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent() {
        this.loopable = true;
        this.interval = 4000;
        this.slides = [];
    }
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.lastIndex = this.slides.length;
        if (this.fivePoint)
            this.init5Point();
        else
            this.init3Point();
        // TODO : ImagesLoaded
        setTimeout(function () { return _this.isLoading = false; }, 300);
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.init3Point = /**
     * @return {?}
     */
    function () {
        this.iterable = this.lastIndex > 1;
        this.positions = {
            'prev': this.lastIndex,
            'current': 1,
            'next': 2
        };
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.init5Point = /**
     * @return {?}
     */
    function () {
        this.loopable = this.lastIndex >= 5;
        this.iterable = this.lastIndex > 3;
        this.positions = {
            'deepPrev': this.loopable ? this.lastIndex : 0,
            'prev': 1,
            'current': 2,
            'next': 3,
            'deepNext': this.iterable ? 4 : null
        };
    };
    /**
     * @param {?} slideItem
     * @return {?}
     */
    CarouselComponent.prototype.slideClick = /**
     * @param {?} slideItem
     * @return {?}
     */
    function (slideItem) {
        this.selectedSlideItem = slideItem;
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.startInterval = /**
     * @return {?}
     */
    function () {
        var _this = this;
        clearInterval(this.autoPosition);
        this.autoPosition = setInterval(function () {
            _this.next();
        }, this.interval);
    };
    Object.defineProperty(CarouselComponent.prototype, "canGoForward", {
        // Decides if it is possible to iterate forward. More readable.
        get: /**
         * @return {?}
         */
        function () {
            if (this.fivePoint)
                return this.positions.next < this.lastIndex
                    || this.infinite && this.loopable;
            else
                return this.positions.current !== this.lastIndex
                    || this.infinite && this.loopable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "canGoBackward", {
        // Decides if it is possible to iterate backward. Shorter.
        get: /**
         * @return {?}
         */
        function () {
            return (this.fivePoint ?
                this.positions.prev > 1 :
                this.positions.current !== 1)
                || this.infinite && this.loopable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CarouselComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        if (this.canGoForward)
            for (var pos in this.positions)
                this.positions[pos] = this.positions[pos] < this.lastIndex ? this.positions[pos] + 1 : 1;
        // this.startInterval();
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.prev = /**
     * @return {?}
     */
    function () {
        if (this.canGoBackward)
            for (var pos in this.positions)
                this.positions[pos] = this.positions[pos] > 1 ? this.positions[pos] - 1 : this.lastIndex;
        // this.startInterval();
    };
    /**
     * @param {?} i
     * @return {?}
     */
    CarouselComponent.prototype.setPosition = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return {
            'deepPrev': i === this.positions.deepPrev,
            'prev': i === this.positions.prev,
            'current': i === this.positions.current,
            'next': i === this.positions.next,
            'deepNext': i === this.positions.deepNext
        };
    };
    Object.defineProperty(CarouselComponent.prototype, "sliderButtonsHidden", {
        get: /**
         * @return {?}
         */
        function () {
            return !this.iterable && (!this.isMobile || this.isFullScreen);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isDefault", {
        get: /**
         * @return {?}
         */
        function () { return !this.custom; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isReady", {
        get: /**
         * @return {?}
         */
        function () { return !this.isLoading; },
        enumerable: true,
        configurable: true
    });
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'acar-ui-carousel',
                    template: "\n\n<!-- Slides Wrapper\nWrapper for slide-items. Could be useful for styling in some cases. -->\n\n<!-- <section class=\"slides\"> -->\n\n\n  <!-- Individual Slide Item\n  (i + 1) for 1 indexed position due to jumpTo(position) -->\n\n  <div\n    *ngFor=\"let slide of slides; let i=index\"\n    class=\"slide-item\"\n    [ngClass]=\"setPosition(i+1)\">\n\n\n    <!-- Customizable Slide Inner\n\n    This should be as extensible as possible.\n    Provides iterable UI element. Custom or not.\n    [ NOTICE ] => styles are not encapsulated! Use BEM naming conventions -->\n\n    <ng-container\n      *ngTemplateOutlet=\"custom ? custom : default; context:{$implicit: slide}\">\n    </ng-container>\n\n    <ng-template #default>\n      <img [src]=\"slide.img\"/>\n      <div class=\"slide-item__overlay\"></div>\n      <div class=\"slide-item__captions\">\n        <h1>{{slide.heading}}</h1>\n        <p>{{slide.predesc}}</p>\n      </div>\n    </ng-template>\n\n  </div>\n<!-- </section> -->\n\n\n<!-- Slider Buttons\n\nprev and next buttons should be acar-ui-icon\nicon is bound to mask-url and easily customizable with global styles. -->\n\n<section class=\"slider__buttons\" [hidden]=\"sliderButtonsHidden\">\n  <div class=\"slider__button slider__button--prev\" (click)=\"prev()\"></div>\n  <div class=\"slider__button slider__button--next\" (click)=\"next()\"></div>\n</section>",
                    styles: ["acar-ui-carousel{position:relative;width:100%;height:100%;overflow:hidden;display:block;background-color:#222}acar-ui-carousel .button{cursor:pointer;font-weight:700}acar-ui-carousel.default{-webkit-perspective:800px;perspective:800px;-webkit-perspective-origin:bottom;perspective-origin:bottom;-webkit-transform-style:preserve-3d;transform-style:preserve-3d}acar-ui-carousel.default.ready .current img{-webkit-transform:scale(1.15);transform:scale(1.15)}acar-ui-carousel.default .slide-item{position:absolute;width:100%;height:100%;display:flex;justify-content:center;align-items:center;overflow:hidden;opacity:0;transition:.6s;-webkit-transform-origin:bottom;transform-origin:bottom}acar-ui-carousel.default .slide-item img{width:100%;transition:transform 4s linear .8s;transition:transform 4s linear .8s,-webkit-transform 4s linear .8s}acar-ui-carousel.default .prev{-webkit-transform:translate3d(0,50%,100px) rotateX(-10deg);transform:translate3d(0,50%,100px) rotateX(-10deg)}acar-ui-carousel.default .prev .slide-item__captions{-webkit-transform:translate3d(0,100px,0);transform:translate3d(0,100px,0)}acar-ui-carousel.default .current{-webkit-transform:translate3d(0,0,0) rotateX(0);transform:translate3d(0,0,0) rotateX(0);transition-delay:.3s;opacity:1}acar-ui-carousel.default .current .slide-item__captions{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}acar-ui-carousel.default .next{-webkit-transform:translate3d(0,10%,-100px) rotateX(20deg);transform:translate3d(0,10%,-100px) rotateX(20deg)}acar-ui-carousel.default .next .slide-item__captions{-webkit-transform:translate3d(0,-100px,0);transform:translate3d(0,-100px,0)}acar-ui-carousel.default .slide-item__captions{position:absolute;bottom:64px;left:64px;color:#fff;font-weight:700;text-shadow:15px 20px 60px #222;transition:transform 1s .3s;transition:transform 1s .3s,-webkit-transform 1s .3s}acar-ui-carousel.default .slide-item__captions *{margin:0}acar-ui-carousel.default .slide-item__captions h1{font-size:4em}acar-ui-carousel.default .slide-item__captions p{font-size:1.5em}acar-ui-carousel.default .slide-item__overlay{width:100%;height:100%;background-color:rgba(0,0,0,.4);position:absolute;top:0}acar-ui-carousel.default .slider__buttons{position:absolute;bottom:64px;right:64px;z-index:1}acar-ui-carousel.default .slider__button{background-color:#fff;opacity:.6;padding:16px;color:#fff;display:inline-block;transition:opacity .3s}acar-ui-carousel.default .slider__button:hover{opacity:1}"],
                    encapsulation: ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return []; };
    CarouselComponent.propDecorators = {
        infinite: [{ type: Input }],
        interval: [{ type: Input }],
        fivePoint: [{ type: Input }],
        slides: [{ type: Input }],
        custom: [{ type: Input }],
        isDefault: [{ type: HostBinding, args: ['class.default',] }],
        isReady: [{ type: HostBinding, args: ['class.ready',] }]
    };
    return CarouselComponent;
}());
export { CarouselComponent };
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.isLoading;
    /** @type {?} */
    CarouselComponent.prototype.isMobile;
    /** @type {?} */
    CarouselComponent.prototype.isFullScreen;
    /** @type {?} */
    CarouselComponent.prototype.lastIndex;
    /** @type {?} */
    CarouselComponent.prototype.iterable;
    /** @type {?} */
    CarouselComponent.prototype.loopable;
    /** @type {?} */
    CarouselComponent.prototype.positions;
    /** @type {?} */
    CarouselComponent.prototype.autoPosition;
    /** @type {?} */
    CarouselComponent.prototype.selectedSlideItem;
    /** @type {?} */
    CarouselComponent.prototype.infinite;
    /** @type {?} */
    CarouselComponent.prototype.interval;
    /** @type {?} */
    CarouselComponent.prototype.fivePoint;
    /** @type {?} */
    CarouselComponent.prototype.slides;
    /** @type {?} */
    CarouselComponent.prototype.custom;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vYWNhci11aS8iLCJzb3VyY2VzIjpbImxpYi9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBZ0ZwRzt3QkFoQlcsSUFBSTt3QkFPSyxJQUFJO3NCQUlDLEVBQUU7S0FLWDs7OztJQUdoQixvQ0FBUTs7O0lBQVI7UUFBQSxpQkFVQztRQVRDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFFcEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkIsSUFBSTtZQUNGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTs7UUFHbkIsVUFBVSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBdEIsQ0FBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQTtLQUM5Qzs7OztJQUdELHNDQUFVOzs7SUFBVjtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLE1BQU0sRUFBSyxJQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBSyxDQUFDO1NBQ2IsQ0FBQTtLQUNGOzs7O0lBR0Qsc0NBQVU7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLElBQUks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QUFJO1lBQ3RDLFNBQVMsRUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1lBQ3pDLE1BQU0sRUFBTyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO1lBQ3RDLFVBQVUsRUFBRyxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO1NBQzNDLENBQUE7S0FDRjtJQUdELHNCQUFJLGtEQUFtQjs7OztRQUF2QjtZQUNFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO1NBQy9EOzs7T0FBQTtJQUVELHNCQUNJLHdDQUFTOzs7O1FBRGIsY0FDa0IsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQSxFQUFFOzs7T0FBQTtJQUV2QyxzQkFDSSxzQ0FBTzs7OztRQURYLGNBQ2dCLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUEsRUFBRTs7O09BQUE7O2dCQTNMekMsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRSx3MkNBZ0REO29CQUNULE1BQU0sRUFBRSxDQUFDLHE3RUFBcTdFLENBQUM7b0JBQy83RSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtpQkFDdEM7Ozs7OzJCQWFFLEtBQUs7MkJBRUwsS0FBSzs0QkFFTCxLQUFLO3lCQUVMLEtBQUs7eUJBRUwsS0FBSzs0QkE2R0wsV0FBVyxTQUFDLGVBQWU7MEJBRzNCLFdBQVcsU0FBQyxhQUFhOzs0QkE3TDVCOztTQXlEYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFRlbXBsYXRlUmVmLCBWaWV3RW5jYXBzdWxhdGlvbiwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGludGVydmFsIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FjYXItdWktY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZTogYFxuXG48IS0tIFNsaWRlcyBXcmFwcGVyXG5XcmFwcGVyIGZvciBzbGlkZS1pdGVtcy4gQ291bGQgYmUgdXNlZnVsIGZvciBzdHlsaW5nIGluIHNvbWUgY2FzZXMuIC0tPlxuXG48IS0tIDxzZWN0aW9uIGNsYXNzPVwic2xpZGVzXCI+IC0tPlxuXG5cbiAgPCEtLSBJbmRpdmlkdWFsIFNsaWRlIEl0ZW1cbiAgKGkgKyAxKSBmb3IgMSBpbmRleGVkIHBvc2l0aW9uIGR1ZSB0byBqdW1wVG8ocG9zaXRpb24pIC0tPlxuXG4gIDxkaXZcbiAgICAqbmdGb3I9XCJsZXQgc2xpZGUgb2Ygc2xpZGVzOyBsZXQgaT1pbmRleFwiXG4gICAgY2xhc3M9XCJzbGlkZS1pdGVtXCJcbiAgICBbbmdDbGFzc109XCJzZXRQb3NpdGlvbihpKzEpXCI+XG5cblxuICAgIDwhLS0gQ3VzdG9taXphYmxlIFNsaWRlIElubmVyXG5cbiAgICBUaGlzIHNob3VsZCBiZSBhcyBleHRlbnNpYmxlIGFzIHBvc3NpYmxlLlxuICAgIFByb3ZpZGVzIGl0ZXJhYmxlIFVJIGVsZW1lbnQuIEN1c3RvbSBvciBub3QuXG4gICAgWyBOT1RJQ0UgXSA9PiBzdHlsZXMgYXJlIG5vdCBlbmNhcHN1bGF0ZWQhIFVzZSBCRU0gbmFtaW5nIGNvbnZlbnRpb25zIC0tPlxuXG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjdXN0b20gPyBjdXN0b20gOiBkZWZhdWx0OyBjb250ZXh0OnskaW1wbGljaXQ6IHNsaWRlfVwiPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0PlxuICAgICAgPGltZyBbc3JjXT1cInNsaWRlLmltZ1wiLz5cbiAgICAgIDxkaXYgY2xhc3M9XCJzbGlkZS1pdGVtX19vdmVybGF5XCI+PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwic2xpZGUtaXRlbV9fY2FwdGlvbnNcIj5cbiAgICAgICAgPGgxPnt7c2xpZGUuaGVhZGluZ319PC9oMT5cbiAgICAgICAgPHA+e3tzbGlkZS5wcmVkZXNjfX08L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuXG4gIDwvZGl2PlxuPCEtLSA8L3NlY3Rpb24+IC0tPlxuXG5cbjwhLS0gU2xpZGVyIEJ1dHRvbnNcblxucHJldiBhbmQgbmV4dCBidXR0b25zIHNob3VsZCBiZSBhY2FyLXVpLWljb25cbmljb24gaXMgYm91bmQgdG8gbWFzay11cmwgYW5kIGVhc2lseSBjdXN0b21pemFibGUgd2l0aCBnbG9iYWwgc3R5bGVzLiAtLT5cblxuPHNlY3Rpb24gY2xhc3M9XCJzbGlkZXJfX2J1dHRvbnNcIiBbaGlkZGVuXT1cInNsaWRlckJ1dHRvbnNIaWRkZW5cIj5cbiAgPGRpdiBjbGFzcz1cInNsaWRlcl9fYnV0dG9uIHNsaWRlcl9fYnV0dG9uLS1wcmV2XCIgKGNsaWNrKT1cInByZXYoKVwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic2xpZGVyX19idXR0b24gc2xpZGVyX19idXR0b24tLW5leHRcIiAoY2xpY2spPVwibmV4dCgpXCI+PC9kaXY+XG48L3NlY3Rpb24+YCxcbiAgc3R5bGVzOiBbYGFjYXItdWktY2Fyb3VzZWx7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpibG9jaztiYWNrZ3JvdW5kLWNvbG9yOiMyMjJ9YWNhci11aS1jYXJvdXNlbCAuYnV0dG9ue2N1cnNvcjpwb2ludGVyO2ZvbnQtd2VpZ2h0OjcwMH1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHR7LXdlYmtpdC1wZXJzcGVjdGl2ZTo4MDBweDtwZXJzcGVjdGl2ZTo4MDBweDstd2Via2l0LXBlcnNwZWN0aXZlLW9yaWdpbjpib3R0b207cGVyc3BlY3RpdmUtb3JpZ2luOmJvdHRvbTstd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDt0cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2R9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0LnJlYWR5IC5jdXJyZW50IGltZ3std2Via2l0LXRyYW5zZm9ybTpzY2FsZSgxLjE1KTt0cmFuc2Zvcm06c2NhbGUoMS4xNSl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVte3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO292ZXJmbG93OmhpZGRlbjtvcGFjaXR5OjA7dHJhbnNpdGlvbjouNnM7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOmJvdHRvbTt0cmFuc2Zvcm0tb3JpZ2luOmJvdHRvbX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlLWl0ZW0gaW1ne3dpZHRoOjEwMCU7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gNHMgbGluZWFyIC44czt0cmFuc2l0aW9uOnRyYW5zZm9ybSA0cyBsaW5lYXIgLjhzLC13ZWJraXQtdHJhbnNmb3JtIDRzIGxpbmVhciAuOHN9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5wcmV2ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsNTAlLDEwMHB4KSByb3RhdGVYKC0xMGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsNTAlLDEwMHB4KSByb3RhdGVYKC0xMGRlZyl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5wcmV2IC5zbGlkZS1pdGVtX19jYXB0aW9uc3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMHB4LDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDEwMHB4LDApfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuY3VycmVudHstd2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCkgcm90YXRlWCgwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApIHJvdGF0ZVgoMCk7dHJhbnNpdGlvbi1kZWxheTouM3M7b3BhY2l0eToxfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuY3VycmVudCAuc2xpZGUtaXRlbV9fY2FwdGlvbnN7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwwLDApO3RyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLDAsMCl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5uZXh0ey13ZWJraXQtdHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAlLC0xMDBweCkgcm90YXRlWCgyMGRlZyk7dHJhbnNmb3JtOnRyYW5zbGF0ZTNkKDAsMTAlLC0xMDBweCkgcm90YXRlWCgyMGRlZyl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5uZXh0IC5zbGlkZS1pdGVtX19jYXB0aW9uc3std2Via2l0LXRyYW5zZm9ybTp0cmFuc2xhdGUzZCgwLC0xMDBweCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlM2QoMCwtMTAwcHgsMCl9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19jYXB0aW9uc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjRweDtsZWZ0OjY0cHg7Y29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7dGV4dC1zaGFkb3c6MTVweCAyMHB4IDYwcHggIzIyMjt0cmFuc2l0aW9uOnRyYW5zZm9ybSAxcyAuM3M7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gMXMgLjNzLC13ZWJraXQtdHJhbnNmb3JtIDFzIC4zc31hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlLWl0ZW1fX2NhcHRpb25zICp7bWFyZ2luOjB9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19jYXB0aW9ucyBoMXtmb250LXNpemU6NGVtfWFjYXItdWktY2Fyb3VzZWwuZGVmYXVsdCAuc2xpZGUtaXRlbV9fY2FwdGlvbnMgcHtmb250LXNpemU6MS41ZW19YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZS1pdGVtX19vdmVybGF5e3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC40KTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MH1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlcl9fYnV0dG9uc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206NjRweDtyaWdodDo2NHB4O3otaW5kZXg6MX1hY2FyLXVpLWNhcm91c2VsLmRlZmF1bHQgLnNsaWRlcl9fYnV0dG9ue2JhY2tncm91bmQtY29sb3I6I2ZmZjtvcGFjaXR5Oi42O3BhZGRpbmc6MTZweDtjb2xvcjojZmZmO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RyYW5zaXRpb246b3BhY2l0eSAuM3N9YWNhci11aS1jYXJvdXNlbC5kZWZhdWx0IC5zbGlkZXJfX2J1dHRvbjpob3ZlcntvcGFjaXR5OjF9YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGlzTG9hZGluZztcbiAgaXNNb2JpbGU7XG4gIGlzRnVsbFNjcmVlbjtcbiAgbGFzdEluZGV4O1xuICBpdGVyYWJsZTtcbiAgbG9vcGFibGUgPSB0cnVlO1xuICBwb3NpdGlvbnM7XG4gIGF1dG9Qb3NpdGlvbjtcbiAgc2VsZWN0ZWRTbGlkZUl0ZW06IGFueTtcblxuICBASW5wdXQoKSBpbmZpbml0ZTtcblxuICBASW5wdXQoKSBpbnRlcnZhbCA9IDQwMDA7XG5cbiAgQElucHV0KCkgZml2ZVBvaW50O1xuXG4gIEBJbnB1dCgpIHNsaWRlczogYW55W10gPSBbXTtcblxuICBASW5wdXQoKSBjdXN0b206IFRlbXBsYXRlUmVmPGFueT47XG5cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubGFzdEluZGV4ID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYodGhpcy5maXZlUG9pbnQpXG4gICAgICB0aGlzLmluaXQ1UG9pbnQoKVxuICAgIGVsc2VcbiAgICAgIHRoaXMuaW5pdDNQb2ludCgpXG5cbiAgICAvLyBUT0RPIDogSW1hZ2VzTG9hZGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmlzTG9hZGluZyA9IGZhbHNlLCAzMDApXG4gIH1cblxuXG4gIGluaXQzUG9pbnQoKSB7XG4gICAgdGhpcy5pdGVyYWJsZSA9IHRoaXMubGFzdEluZGV4ID4gMTtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHtcbiAgICAgICdwcmV2JyAgIDogdGhpcy5sYXN0SW5kZXgsXG4gICAgICAnY3VycmVudCc6IDEsXG4gICAgICAnbmV4dCcgICA6IDJcbiAgICB9XG4gIH1cblxuXG4gIGluaXQ1UG9pbnQoKSB7XG4gICAgdGhpcy5sb29wYWJsZSA9IHRoaXMubGFzdEluZGV4ID49IDU7XG4gICAgdGhpcy5pdGVyYWJsZSA9IHRoaXMubGFzdEluZGV4ID4gMztcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHtcbiAgICAgICdkZWVwUHJldicgOiB0aGlzLmxvb3BhYmxlID8gdGhpcy5sYXN0SW5kZXggOiAwLFxuICAgICAgJ3ByZXYnICAgICA6IDEsXG4gICAgICAnY3VycmVudCcgIDogMixcbiAgICAgICduZXh0JyAgICAgOiAzLFxuICAgICAgJ2RlZXBOZXh0JyA6IHRoaXMuaXRlcmFibGUgPyA0IDogbnVsbFxuICAgIH1cbiAgfVxuXG5cbiAgc2xpZGVDbGljayhzbGlkZUl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkU2xpZGVJdGVtID0gc2xpZGVJdGVtO1xuICB9XG5cblxuICBzdGFydEludGVydmFsKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUG9zaXRpb24pO1xuXG4gICAgdGhpcy5hdXRvUG9zaXRpb24gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLm5leHQoKVxuICAgIH0sIHRoaXMuaW50ZXJ2YWwpXG4gIH1cblxuXG4gIC8vIERlY2lkZXMgaWYgaXQgaXMgcG9zc2libGUgdG8gaXRlcmF0ZSBmb3J3YXJkLiBNb3JlIHJlYWRhYmxlLlxuICBnZXQgY2FuR29Gb3J3YXJkKCkge1xuICAgIGlmKHRoaXMuZml2ZVBvaW50KVxuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLm5leHQgPCB0aGlzLmxhc3RJbmRleFxuICAgICAgICB8fCB0aGlzLmluZmluaXRlICYmIHRoaXMubG9vcGFibGVcbiAgICBlbHNlIFxuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpb25zLmN1cnJlbnQgIT09IHRoaXMubGFzdEluZGV4XG4gICAgICAgIHx8IHRoaXMuaW5maW5pdGUgJiYgdGhpcy5sb29wYWJsZVxuICB9XG5cblxuICAvLyBEZWNpZGVzIGlmIGl0IGlzIHBvc3NpYmxlIHRvIGl0ZXJhdGUgYmFja3dhcmQuIFNob3J0ZXIuXG4gIGdldCBjYW5Hb0JhY2t3YXJkKCkge1xuICAgIHJldHVybiAodGhpcy5maXZlUG9pbnQgP1xuICAgICAgdGhpcy5wb3NpdGlvbnMucHJldiA+IDEgOlxuICAgICAgdGhpcy5wb3NpdGlvbnMuY3VycmVudCAhPT0gMSlcbiAgICAgICAgfHwgdGhpcy5pbmZpbml0ZSAmJiB0aGlzLmxvb3BhYmxlXG4gIH1cblxuXG4gIG5leHQoKSB7XG4gICAgaWYodGhpcy5jYW5Hb0ZvcndhcmQpXG4gICAgICBmb3IobGV0IHBvcyBpbiB0aGlzLnBvc2l0aW9ucylcbiAgICAgICAgdGhpcy5wb3NpdGlvbnNbcG9zXSA9IHRoaXMucG9zaXRpb25zW3Bvc10gPCB0aGlzLmxhc3RJbmRleCA/IHRoaXMucG9zaXRpb25zW3Bvc10gKyAxIDogMVxuXG4gICAgLy8gdGhpcy5zdGFydEludGVydmFsKCk7XG4gIH1cblxuXG4gIHByZXYoKSB7XG4gICAgaWYodGhpcy5jYW5Hb0JhY2t3YXJkKVxuICAgICAgZm9yKGxldCBwb3MgaW4gdGhpcy5wb3NpdGlvbnMpXG4gICAgICAgIHRoaXMucG9zaXRpb25zW3Bvc10gPSB0aGlzLnBvc2l0aW9uc1twb3NdID4gMSA/IHRoaXMucG9zaXRpb25zW3Bvc10gLSAxIDogdGhpcy5sYXN0SW5kZXhcblxuICAgIC8vIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xuICB9XG5cblxuICBzZXRQb3NpdGlvbihpOiBudW1iZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ2RlZXBQcmV2JzogIGkgPT09IHRoaXMucG9zaXRpb25zLmRlZXBQcmV2LFxuICAgICAgJ3ByZXYnOiAgICAgIGkgPT09IHRoaXMucG9zaXRpb25zLnByZXYsXG4gICAgICAnY3VycmVudCc6ICAgaSA9PT0gdGhpcy5wb3NpdGlvbnMuY3VycmVudCxcbiAgICAgICduZXh0JzogICAgICBpID09PSB0aGlzLnBvc2l0aW9ucy5uZXh0LFxuICAgICAgJ2RlZXBOZXh0JzogIGkgPT09IHRoaXMucG9zaXRpb25zLmRlZXBOZXh0XG4gICAgfVxuICB9XG5cblxuICBnZXQgc2xpZGVyQnV0dG9uc0hpZGRlbigpIHtcbiAgICByZXR1cm4gIXRoaXMuaXRlcmFibGUgJiYgKCF0aGlzLmlzTW9iaWxlIHx8IHRoaXMuaXNGdWxsU2NyZWVuKVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kZWZhdWx0JylcbiAgZ2V0IGlzRGVmYXVsdCgpIHsgcmV0dXJuICF0aGlzLmN1c3RvbSB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5yZWFkeScpXG4gIGdldCBpc1JlYWR5KCkgeyByZXR1cm4gIXRoaXMuaXNMb2FkaW5nIH1cbn1cbiJdfQ==