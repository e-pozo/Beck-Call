import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../../../models/Company';
import { Option } from '../../../models/Option';
import { OptionsService } from '../../../services/options.service';
import { CompaniesService } from '../../../services/companies.service';
import { FormBuilder, FormGroup, Validators} from  '@angular/forms';

declare var $: any;
interface Parameter{
  seller: {
    to: string,
    region: string,
    type: string,
    selectAll: boolean
  },
  buyer: {
    to: string,
    region: string,
    type: string,
    selectAll: boolean
  }
}
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  @ViewChild('sellerList') sellerList;
  @ViewChild('buyerList') buyerList;
  @ViewChild('popUpOptionForm') popUpOptionForm: ElementRef;

  company: Company;
  parameters: Parameter = {
    seller: {
      to: 'seller',
      region: 'Europea',
      type: 'Call',
      selectAll: false
    },
    buyer: {
      to: 'buyer',
      region: 'Europea',
      type: 'Call',
      selectAll: false
    }
  };
  form: FormGroup;
  form2: FormGroup;
  to;
  ready: boolean = false;
  hidden: boolean = false;
  option_recived: Option;

  constructor(private route: ActivatedRoute, private companyData: CompaniesService, private optionService: OptionsService, private fb: FormBuilder) {
    this.form = fb.group({
      'contract_name': [null, Validators.compose([Validators.required, Validators.maxLength(70)])],
      'bid_price': [null, Validators.compose([Validators.required, Validators.min(0)])],
      'ask_price': [null, Validators.compose([Validators.required, Validators.min(0)])],
      'expire_date': [null, Validators.required],
      'strike_price': [null, Validators.compose([Validators.required, Validators.min(0)])],
      'region': [null],
      'to': [null],
      'type': [null]
    });
    this.form2 = fb.group({
      'contract_name': [null, Validators.compose([Validators.required, Validators.maxLength(70)])],
      'bid_price': [null, Validators.compose([Validators.required, Validators.min(0)])],
      'ask_price': [null, Validators.compose([Validators.required, Validators.min(0)])],
      'expire_date': [null, Validators.required],
      'strike_price': [null, Validators.compose([Validators.required, Validators.min(0)])],
      'region': [null],
      'to': [null],
      'type': [null]
    });
  }

  ngOnInit() {
    this.companyData.get(Number(this.route.snapshot.paramMap.get('id'))).subscribe(company => {
      this.company = company;
      this.ready = true;
      console.log(this.company);
    });
  }

  change(to, option, optionValue){
    let seller = this.parameters.seller;
    let buyer = this. parameters.buyer;
    console.log(option, optionValue)
    if(to === 'seller'){
      if (option === 'type'){
        seller = {
          to: 'seller',
          type: optionValue,
          region: seller.region,
          selectAll: seller.selectAll
        }
      }
      if(option === 'toggleAll'){
        seller = {
          to: 'seller',
          type: seller.type,
          region: seller.region,
          selectAll: optionValue
        }
      }
      if(option === 'region'){
        seller = {
          to: 'seller',
          type: seller.type,
          region: optionValue,
          selectAll: seller.selectAll
        }
      }
    }
    else{
      if (option === 'type'){
        buyer = {
          to: 'buyer',
          type: optionValue,
          region: buyer.region,
          selectAll: buyer.selectAll
        }
      }
      if(option === 'toggleAll'){
        buyer = {
          to: 'buyer',
          type: buyer.type,
          region: buyer.region,
          selectAll: optionValue
        }
      }
      if(option === 'region'){
        buyer = {
          to: 'buyer',
          type: buyer.type,
          region: optionValue,
          selectAll: buyer.selectAll
        }
      }
    }
    this.parameters = {seller: seller, buyer:buyer};
  }

  addOption(option: Option): void{
    option.pricing = null;
    option.to = this.to === 'sell' ? true : false;
    this.optionService.add(this.company, option).subscribe( response => {
      if(option.to){
        this.sellerList.pushOption(option)
        this.sellerList.listOptions();
      }
      else{
        this.buyerList.pushOption(option)
        this.buyerList.listOptions();
      }
      $('#popUpOptionForm').modal('hide');
    });
  }

  receiveOption(eventCompany){
    console.log(eventCompany);
    this.option_recived = eventCompany;
    /*
    document.getElementById("edit_contract_name").setAttribute("value", this.option_recived.contract_name);
    document.getElementById("edit_contract_name_label").classList.remove("is-empty");

    document.getElementById("edit_region").setAttribute("selectedIndex", this.option_recived.region ? "1" : "0");
    document.getElementById("edit_region").setAttribute("value", this.option_recived.region ? "Europea" : "Americana");

    document.getElementById("edit_strike_price").setAttribute("value", this.option_recived.strike_price.toString());
    document.getElementById("edit_strike_price_label").classList.remove("is-empty");

    document.getElementById("edit_bid_price").setAttribute("value", this.option_recived.bid_price.toString());
    document.getElementById("edit_bid_price_label").classList.remove("is-empty");

    document.getElementById("edit_ask_price").setAttribute("value", this.option_recived.ask_price.toString());
    document.getElementById("edit_ask_price_label").classList.remove("is-empty");

    document.getElementById("edit_type").setAttribute("selectedIndex", this.option_recived.type ? "1" : "0");
    document.getElementById("edit_type").setAttribute("value", this.option_recived.type ? "Put" : "Call");

    document.getElementById("edit_to").setAttribute("selectedIndex", this.option_recived.type ? "1" : "0");
    document.getElementById("edit_to").setAttribute("value", this.option_recived.type ? "Sell" : "Buy");

    document.getElementById("edit_date").setAttribute("value", this.option_recived.expire_date);
    document.getElementById("edit_date_label").classList.remove("is-empty");
    */

    document.getElementById("edit_contract_name_label").classList.remove("is-empty");

    document.getElementById("edit_strike_price_label").classList.remove("is-empty");

    document.getElementById("edit_bid_price_label").classList.remove("is-empty");

    document.getElementById("edit_ask_price_label").classList.remove("is-empty");

    // document.getElementById("edit_date").setAttribute("value", this.option_recived.expire_date);
    document.getElementById("edit_date_label").classList.remove("is-empty");

    this.form2.controls['contract_name'].setValue(this.option_recived.contract_name);
    this.form2.controls['strike_price'].setValue(this.option_recived.strike_price);
    this.form2.controls['bid_price'].setValue(this.option_recived.bid_price);
    this.form2.controls['ask_price'].setValue(this.option_recived.ask_price);
    this.form2.controls['type'].setValue(this.option_recived.type);
    this.form2.controls['to'].setValue(this.option_recived.to);
    this.form2.controls['region'].setValue(this.option_recived.region);
    this.form2.controls['expire_date'].setValue(this.option_recived.expire_date);

  }

  volverNumero(numero: string | number): number{
    let coso;
    if(typeof numero == "string"){
      coso = parseInt(numero);
    }
    else{
      coso = numero;
    }
    return coso;
  }

  updateOption(option: Option): void{
    option.pricing = this.option_recived.pricing;
    option.id = this.option_recived.id;


    /*
    option.ask_price = this.volverNumero(option.ask_price);
    option.bid_price = this.volverNumero(option.bid_price);
    option.strike_price = this.volverNumero(option.strike_price);
*/

    this.optionService.edit(this.company, option).subscribe(response => {
      alert("Actualizado!");
      if(option.to){
        this.sellerList.editOption(option)
        this.sellerList.listOptions();
      }
      else{
        this.buyerList.editOption(option)
        this.buyerList.listOptions();
      }
    }
    );
  }
}
