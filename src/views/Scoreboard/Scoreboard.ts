import TopView from '../../components/TopView/TopView';
import Table from '../../components/Table/Table';
import BackButton from '../../components/BackButton/BackButton';
import Transport from '../../modules/Transport/Transport';

import './Scoreboard.scss';
import Button from '../../components/Button/Button';

import {COUNT_PER_REQUEST, TABLE_DATA} from '../../game/Constants/Scoreboard';

export default class Scoreboard extends TopView {
    private moreButton: Button;
    private table: Table;
    private isFull: boolean;
    private count: number;

    constructor() {
        super({class: 'content__scoreboard'});
        this.isFull = false;
        this.moreButton = null;
        this.count = 0;
    }

    rerender() {
        this.removeComponents();
        this.build();
    }

    build() {
        this.table = new Table(TABLE_DATA, 'content__scoreboard__table');
        this._buildMoreButton();
        this.addRows();

        this._components = [
            this.table,
            this.moreButton,
            new BackButton()
        ];

        super.build();
    }

    async getRows() {
        const rows: any[] = [];
        const result = await Transport.get(`/stop?limit=${COUNT_PER_REQUEST}&since=${this.count}`);
        result.forEach(({login, sscore, mscore}: { login: string, sscore: string, mscore: string }) => {
            rows.push([login, sscore, mscore]);
        });

        this.count += rows.length;
        return rows;
    }

    async addRows() {
        const rows = await this.getRows();
        if (rows.length === 0) {
            this._deleteMoreButton();
            return;
        }
        this.table.addRow(rows);
        this._rerenderMoreButton();
    }

    private _rerenderMoreButton() {
        const _table = this.table.getElement();
        this.moreButton.getElement().setAttribute('class', (_table as HTMLTableElement).rows.length % 2 ? 'button-more_odd' : 'button-more_even');
    }

    private _initButton() {
        this.moreButton = new Button({text: '. . .'});
        this.moreButton.getElement().addMultiEvents('click touchend', () => {
            this.addRows();
        });
    }

    private _buildMoreButton() {
        if (!this.isFull) {
            if (!this.moreButton) {
                this._initButton();
            }
            this._rerenderMoreButton();
        }
    }

    private _deleteMoreButton() {
        this.moreButton.remove();
    }
}
