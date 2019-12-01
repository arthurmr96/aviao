import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private sqlite: SQLite,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      /*this.sqlite.create({
        name: 'aviao',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql(`create table if not exists operacoes(
          id integer unsigned auto_increment primary key,
          nome varchar(255),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

        db.executeSql(`
        create table if not exists acoes(
          id integer unsigned auto_increment primary key,
          data datetime,
          responsavel varchar(255),
          informacao_adicional text,
          troca_tripulacao integer(1),
          tipo enum('embarque', 'desembarque'),
          chegada_tripulacao datetime,
          tripulacao_assumindo datetime,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`);

        db.executeSql(`
        create table if not exists acoes_operacoes(
          acoes_id integer unsigned,
          operacoes_id integer_unsigned,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        `);
      });*/
    });
  }
}
