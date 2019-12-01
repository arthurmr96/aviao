import {Component} from '@angular/core';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    constructor(
        private vibration: Vibration,
        private emailComposer: EmailComposer,
        private acao: {
            data: Date,
            troca_tripulacao: boolean,
            chegada_tripulacao: Date,
            tripulacao_assumindo: Date,
            responsavel: string,
            ps: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            ca: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            ld: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            td: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            le: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            te: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            fp: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            pb: {time: '00:00:000', timeStopped, stoppedDuration, running: false, started},
            informacao_adicional: string,
        }
    ) {
        this.init();
    }

    init() {
        this.acao.data = new Date();
    }

    clear() {
      this.acao = {
        data: new Date(),
        troca_tripulacao: false,
        chegada_tripulacao: null,
        tripulacao_assumindo: null,
        responsavel: '',
        ps: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        ca: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        ld: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        td: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        le: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        te: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        fp: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        pb: {time: '00:00:000', timeStopped: null, stoppedDuration: null, running: false, started: null},
        informacao_adicional: '',
      };
    }

    saveIntoDatabase() {
        // TODO: Salvar no banco de dados o registro
    }

    sendToEmail() {
        // TODO: Enviar para o email
    }

    save() {
        // TODO: Acionar funções de salvar no banco e enviar por email formulário
    }
}
