/*
 *     Copyright (c) 2011-2016 CoNWeT Lab., Universidad Politécnica de Madrid
 *     Copyright (c) 2020-2021 Future Internet Consulting and Development Solutions S.L.
 *
 *     This file is part of Wirecloud Platform.
 *
 *     Wirecloud Platform is free software: you can redistribute it and/or
 *     modify it under the terms of the GNU Affero General Public License as
 *     published by the Free Software Foundation, either version 3 of the
 *     License, or (at your option) any later version.
 *
 *     Wirecloud is distributed in the hope that it will be useful, but WITHOUT
 *     ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *     FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 *     License for more details.
 *
 *     You should have received a copy of the GNU Affero General Public License
 *     along with Wirecloud Platform.  If not, see
 *     <http://www.gnu.org/licenses/>.
 *
 */

/* globals StyledElements */


(function (se, utils) {

    "use strict";

    /**
     * Permite distribuir contenidos según un border layout.
     */
    se.BorderLayout = class BorderLayout extends se.StyledElement {

        constructor(options) {
            super([]);

            options = utils.merge({
                'class': ''
            }, options);

            this.wrapperElement = document.createElement('div');
            this.wrapperElement.className = utils.appendWord(options.class, "se-border-layout");

            Object.defineProperties(this, {
                north: {value: new StyledElements.Container({'class': 'se-bl-north-container'})},
                west: {value: new StyledElements.Container({'class': 'se-bl-west-container'})},
                center: {value: new StyledElements.Container({'class': 'se-bl-center-container'})},
                east: {value: new StyledElements.Container({'class': 'se-bl-east-container'})},
                south: {value: new StyledElements.Container({'class': 'se-bl-south-container'})}
            });

            this.north.insertInto(this.wrapperElement);
            this.west.insertInto(this.wrapperElement);
            this.center.insertInto(this.wrapperElement);
            this.east.insertInto(this.wrapperElement);
            this.south.insertInto(this.wrapperElement);
        }

        repaint(temporal) {
            const usableArea = {
                'width': this.wrapperElement.offsetWidth,
                'height': this.wrapperElement.offsetHeight
            };

            const h1 = this.north.wrapperElement.offsetHeight;
            const h2 = usableArea.height - this.south.wrapperElement.offsetHeight;
            const centerHeight = h2 - h1;
            if (centerHeight < 0) {
                centerHeight = 0;
            }

            const v1 = this.west.wrapperElement.offsetWidth;
            const v2 = usableArea.width - this.east.wrapperElement.offsetWidth;
            const centerWidth = v2 - v1;
            if (centerWidth < 0) {
                centerWidth = 0;
            }

            this.west.wrapperElement.style.top = h1 + 'px';
            this.west.wrapperElement.style.height = centerHeight + 'px';
            this.center.wrapperElement.style.top = h1 + 'px';
            this.center.wrapperElement.style.height = centerHeight + 'px';
            this.center.wrapperElement.style.width = centerWidth + 'px';
            this.center.wrapperElement.style.left = v1 + 'px';
            this.east.wrapperElement.style.top = h1 + 'px';
            this.east.wrapperElement.style.height = centerHeight + 'px';
            this.east.wrapperElement.style.left = v2 + 'px';

            this.south.wrapperElement.style.top = h2 + 'px';

            this.north.repaint(temporal);
            this.west.repaint(temporal);
            this.center.repaint(temporal);
            this.east.repaint(temporal);
            this.south.repaint(temporal);
        }

        getNorthContainer() {
            return this.north;
        }

        getWestContainer() {
            return this.west;
        }

        getCenterContainer() {
            return this.center;
        }

        getEastContainer() {
            return this.east;
        }

        getSouthContainer() {
            return this.south;
        }

    }

})(StyledElements, StyledElements.Utils);
