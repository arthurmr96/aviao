import {Component} from '@angular/core';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private acao;

    constructor(
        private vibration: Vibration,
        private emailComposer: EmailComposer,
    ) {
        this.init();
    }

    init() {
        this.acao = {
            data: new Date().toISOString(),
            troca_tripulacao: false,
            chegada_tripulacao: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null,
                running: false, started: null},
            tripulacao_assumindo: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null,
                running: false, started: null},
            responsavel: '',
            ps: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            ca: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            ld: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            td: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            le: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            te: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            fp: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            pb: { time: '00:00:000', timeBegan: null, timeStopped: null, stoppedDuration: null, running: false, started: null},
            informacao_adicional: '',
        };
    }

    start(operacao) {
        if (this.acao[operacao].running) {
            return;
        }

        this.vibration.vibrate([2000, 1000, 1000]);

        if (this.acao[operacao].timeBegan === null) {
            this.reset(operacao);
            this.acao[operacao].timeBegan = new Date();
        }
        if (this.acao[operacao].timeStopped !== null) {
            const newStoppedDuration: any = (+new Date() - this.acao[operacao].timeStopped);
            this.acao[operacao].stoppedDuration = this.acao[operacao].stoppedDuration + newStoppedDuration;
        }
        this.acao[operacao].started = setInterval(this.clockRunning.bind(this, operacao), 10);
        this.acao[operacao].running = true;
    }

    stop(operacao) {
        this.vibration.vibrate([1000, 1000, 2000]);

        this.acao[operacao].running = false;
        this.acao[operacao].timeStopped = new Date();
        clearInterval(this.acao[operacao].started);
    }

    reset(operacao) {
        this.vibration.vibrate([1000, 500, 1000]);
        this.acao[operacao].running = false;
        clearInterval(this.acao[operacao].started);
        this.acao[operacao].stoppedDuration = 0;
        this.acao[operacao].timeBegan = null;
        this.acao[operacao].timeStopped = null;
        this.acao[operacao].time = '00:00:00';
    }

    zeroPrefix(num, digit) {
        let zero = '';
        for (let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    clockRunning(operacao) {
        const currentTime: any = new Date();
        const timeElapsed: any = new Date(currentTime - this.acao[operacao].timeBegan - this.acao[operacao].stoppedDuration);
        const hour = timeElapsed.getUTCHours();
        const min = timeElapsed.getUTCMinutes();
        const sec = timeElapsed.getUTCSeconds();
        const ms = timeElapsed.getUTCMilliseconds();
        this.acao[operacao].time =
            this.zeroPrefix(hour, 2) + ':' +
            this.zeroPrefix(min, 2) + ':' +
            this.zeroPrefix(sec, 2);
    }

    saveIntoDatabase() {
        // TODO: Salvar no banco de dados o registro
    }

    sendToEmail() {
        this.emailComposer.isAvailable().then((available: boolean) =>{
            if (available) {
                const emailMessage = `
                    <h2>Data</h2>
                    <p>${this.acao.data}</p>
                    <h2>Responsável</h2>
                    <p>${this.acao.responsavel}</p>
                    <h2>Houve troca de tripulação?</h2>
                    <p>${this.acao.troca_tripulacao}</p>
                    <h2>PS</h2>
                    <h2>CA</h2>
                    <h2>LD</h2>
                    <h2>TD</h2>
                    <h2>LE</h2>
                    <h2>TE</h2>
                    <h2>FP</h2>
                    <h2>PB</h2>
                    <h2>Informações Adicionais</h2>
`;
                const email = {
                    to: 'arthurmr13@hotmail.com',
                    subject: 'Ionic Email - Aviao',
                    body: emailMessage,
                    isHtml: true
                };

                this.emailComposer.open(email);
            }
        });
    }

    save() {
        this.sendToEmail();
    }
}
