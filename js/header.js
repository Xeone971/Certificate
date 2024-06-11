/*
 * File: header.js
 * Contract: EU contract 2022-FR01-KA220-HED-000023509
 * Project: FitNESS 2 ERASMUS+
 * File Created: Friday, 24th May 2024
 * Authors: Steward OUADI (AgroParisTech),  Olivier VITRAC (INRAE), Lucca COLLAS
 * -----
 * Last Modified: Tuesday, 11th June 2024
 * Modified By: Lucca COLLAS
 */
class Header extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <div class="topnav" id="topNavId1">
          <a href="https://fitness.agroparistech.fr" >Home</a>
          <a href="javascript:void(0);" class="icon" onclick="topNavOnClick()">
              <i class="fa fa-bars"></i>
          </a>
          <a href="fitness2/certificate/" >Form</a>
          <a href="javascript:void(0);" class="icon" onclick="topNavOnClick()">
              <i class="fa fa-bars"></i>
          </a>
          <a href="/fitness2/certificate/html/approbation.html" >Certificate</a>
          <a href="javascript:void(0);" class="icon" onclick="topNavOnClick()">
              <i class="fa fa-bars"></i>
          </a>
          <a href="/html/dataManagement.html" >Data</a>
          <a href="javascript:void(0);" class="icon" onclick="topNavOnClick()">
              <i class="fa fa-bars"></i>
          </a>
          
      </div>
      `;
    }
  }
  
  customElements.define("main-header", Header);