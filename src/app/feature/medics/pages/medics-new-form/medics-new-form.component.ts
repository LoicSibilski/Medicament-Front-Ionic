import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedicService } from '../../services/medic.service';
import { Router } from '@angular/router';
import { DureesNewFormComponent } from 'src/app/feature/duree/pages/durees-new-form/durees-new-form.component';
import { FrequencesNewFormComponent } from 'src/app/feature/frequence/pages/frequences-new-form/frequences-new-form.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicTmp } from '../../models/medic-tmp';
import { FrequenceDataDto } from 'src/app/feature/frequence/models/frequence-data-dto';
import { DureeDataDto } from 'src/app/feature/duree/models/duree-data-dto';
import { HoraireDataDto } from 'src/app/feature/frequence/models/horaire-data-dto';
import { DureeService } from 'src/app/feature/duree/service/duree.service';
import { FrequenceService } from 'src/app/feature/frequence/service/frequence.service';

@Component({
  selector: 'app-medics-new-form',
  templateUrl: './medics-new-form.component.html',
  styleUrls: ['./medics-new-form.component.css']
})
export class MedicsNewFormComponent implements OnInit {

  medicForm: FormGroup;
  heures: FormArray;

  dureeDataDto : DureeDataDto;
  frequenceDataDto : FrequenceDataDto;
  horaireDataDto : HoraireDataDto;
  
  medicTmp: MedicTmp;

  constructor(
    private medicService: MedicService,
    private dureeService: DureeService,
    private frequenceService: FrequenceService,
    private fb: FormBuilder,
    private router: Router,
    private dialogRefDuree: MatDialogRef<DureesNewFormComponent>,
    private dialogRefFrequence: MatDialogRef<FrequencesNewFormComponent>,
    private dialog: MatDialog) {

      this.dureeDataDto = new DureeDataDto(null, null, null, null);
      this.frequenceDataDto = new FrequenceDataDto(null,null,null,null,null,null,null,null,null,null,null,null);
      this.horaireDataDto = new HoraireDataDto([]);
      this.medicTmp = new MedicTmp("", this.dureeDataDto, this.frequenceDataDto, []);

    this.medicForm = this.fb.group({
      nom: "",
      heures: this.fb.array([]),
    });

  }

  ngOnInit() {
  }

  openDureeFormDialog() {
    const dialogConfigDuree = new MatDialogConfig();

    dialogConfigDuree.disableClose = true;
    dialogConfigDuree.autoFocus = true;

    this.dialogRefDuree = this.dialog.open(DureesNewFormComponent, dialogConfigDuree);
    this.dialogRefDuree.afterClosed().subscribe(res => {
      this.dureeDataDto = res;
    })
  }

  openFrequenceFormDialog() {

    const dialogConfigFrequence = new MatDialogConfig();
    dialogConfigFrequence.disableClose = true;
    dialogConfigFrequence.autoFocus = true;

    this.dialogRefFrequence = this.dialog.open(FrequencesNewFormComponent, dialogConfigFrequence);
    this.dialogRefFrequence.afterClosed().subscribe(res => {
      this.frequenceDataDto = res;
    })
  }


  ajouter = () => {
    this.medicTmp.nom = this.medicForm.value.nom;
    this.medicTmp.dureeData = this.dureeDataDto;
    this.medicTmp.frequenceData = this.frequenceDataDto;

    this.medicForm.value.heures.forEach(element => {
      this.medicTmp.listeHeuresData.push(element.heure);
    });

    //this.medicTmp.listeHeures = this.horaireDataDto;
    console.log(JSON.stringify(this.medicTmp));
    this.medicService.create(this.medicTmp).subscribe(medic => {
      this.router.navigate(["/medics"]);
    });
  }

  addHeures() {
    const heures = this.getHeures();
    heures.push(this.fb.group({
      heure: new FormControl(),
    }));

  }

  getHeures() {
    return this.medicForm.controls["heures"] as FormArray;
  }

  trackByFn(index) {
    return index;
  }

  choixDureePasDeFin() {
    return this.dureeDataDto.choixDuree === this.dureeService.PAS_DE_FIN;
  }

  choixDureeJusqueX() {
    return this.dureeDataDto.choixDuree === this.dureeService.JUSQUE_DATE;
  }

  choixDureePendantX() {
    return this.dureeDataDto.choixDuree === this.dureeService.PENDANT_X_JOURS;
  }

  choixFrequenceChaqueJoursXParJour() {
    return this.frequenceDataDto.choixFrequence === this.frequenceService.CHAQUE_JOURS_X_PAR_JOURS;
  }

  choixFrequenceChaqueJoursTtsXHeures() {
    return this.frequenceDataDto.choixFrequence ===this.frequenceService.CHAQUE_JOURS_TTS_X_HEURES;
  }

  choixFrequenceTtsxJours() {
    return this.frequenceDataDto.choixFrequence === this.frequenceService.TTS_X_JOURS;
  }

  choixFrequenceCertainsJours() {
    return this.frequenceDataDto.choixFrequence === this.frequenceService.CERTAINS_JOURS;
  }

  certainsJoursLundi(){
    return this.frequenceDataDto.lundi
  }
  certainsJoursMardi(){
    return this.frequenceDataDto.mardi
  }
  certainsJoursMercredi(){
    return this.frequenceDataDto.mercredi
  }
  certainsJoursJeudi(){
    return this.frequenceDataDto.jeudi
  }
  certainsJoursVendredi(){
    return this.frequenceDataDto.vendredi
  }
  certainsJoursSamedi(){
    return this.frequenceDataDto.samedi
  }
  certainsJoursDimanche(){
    return this.frequenceDataDto.dimanche
  }

}
