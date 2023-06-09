import React, { useContext } from 'react'
import UrlTable from '../components/UrlTable'
import { useEffect, useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { SearchSku, createSku } from '../services/skuService';
import { runCompetitorScript } from '../services/scriptService';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { appContext } from '../App';



const Competitors = ({skuUpdate}) => {
  
  const context = useContext(appContext)  
  const [sku, setSkus] = useState(skuUpdate);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [toggleInput, setToggleinput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skuName, setSkuName] = useState("");
  const [prixFournisseur, setPrixFournisseur] = useState("");
  const [query, setQuery] = useState("");

  const show = (severity, summary, message) => {
      toast.current.show({ severity: severity, summary: summary, detail: message });
  };

  const onSubmit = () => {
    let newPrice = 0;
    if(prixFournisseur && toggleInput) {
      if(prixFournisseur.includes(',')) {
        newPrice = prixFournisseur.replace(',', '.')
      } else {
        newPrice = prixFournisseur
      }
    } else {
      newPrice = null
    }
    createSku({name: skuName, prix_fournisseur: newPrice || null, internal_ref: newPrice ? 1 : 0}).then((res) => {
      if (!res.error) {
        show("success", "Success", res.message)
        context.addToArray(res)
      }
      if(res.error) {
        show("error", "Error", res.error)
      }
      setSkuName('')
    })
  }

  const onSearch = (e) => {
    e.preventDefault()
    SearchSku(query).then((res) => {
      if(res) {
        context.fullRefreshArray(res)
        setSkus(res)
      }
    })
  }

  const clearSearch = () => {
    SearchSku("").then((res) => {
      setQuery('')
      if(res) {
        context.fullRefreshArray(res.reverse())
        setSkus(res)
      }
    })
  }

  
  const updateState = () => {
      setToggle(true)
      setLoading(false)
  }

  const runCompetitorRequest = () => {
    if (toggle) {
        setToggle(false)
        setLoading(true)

        runCompetitorScript().then((res) => {
            updateState()
            if (res.message) {
                show("success", "Success", res.message)
            } else {
                show("error", "Error", res.error)
            }
        })
    }
}
  
  

  return (
    <div className='flex flex-col w-full justify-center items-center h-auto mt-[50px]'>
      <Toast ref={toast} />
      <div className='gap-2 flex'>
        <Button label="Lancer le script concurent" icon="" iconPos="right" loading={loading} onClick={() => runCompetitorRequest()}/>
        <a href="http://79.137.87.52/final_output.xlsx" ><Button icon="pi pi-download" severity="success" aria-label="Search" label="Télécharger le fichier" /></a>
        <Button label="Ajouter" icon="pi pi-plus" iconPos="right" onClick={() => setVisible(true)}/>
      </div>
      <form onSubmit={(e) => onSearch(e)}>
        <div className='flex m-4'> 
          <InputText value={query} onChange={(e) => setQuery(e.target.value)} placeholder='A2221-ECN' className='min-w-[280px]'/>
          <Button style={{margin: '3px'}} label="Rechercher" icon="pi pi-search" iconPos="right" onClick={(e) => onSearch(e)}/>
          {query ? <Button style={{margin: '3px'}}  icon="pi pi-undo" iconPos="right" onClick={() => clearSearch()}/> : null}
        </div>
      </form>
      <div className='flex justify-center mt-5 w-full'>
          {sku ? <UrlTable sku={skuUpdate} setSkus={setSkus}/> : null}
      </div>
      <Dialog header="Ajouter un SKU" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
        <div className='flex flex-col justify-center items-start gap-2'>
          <InputText value={skuName} onChange={(e) => setSkuName(e.target.value)} placeholder='A2221-ECN'/>
          {toggleInput ? <InputText value={prixFournisseur} onChange={(e) => setPrixFournisseur(e.target.value)} placeholder='74.44'/> : null}
          <ToggleButton onLabel="Référence interne" offLabel="Référence externe" checked={toggleInput} onChange={(e) => setToggleinput(e.value)} />
          <div>
            <Button style={{marginTop: '3px', marginRight: '5px'}} label="Annuler" icon="pi pi-times" iconPos="right" severity="danger" onClick={() => setVisible(false)}/>
            <Button style={{marginTop: '3px'}} label="Ajouter" icon="pi pi-pi-add" iconPos="right" severity="success" onClick={() => {
              setVisible(false)
              onSubmit()
            }}/>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Competitors