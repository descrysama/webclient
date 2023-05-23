import React from 'react'
import UrlTable from '../components/UrlTable'
import { useEffect, useState, useRef } from 'react'
import { Dialog } from 'primereact/dialog';
import { fetchAllSku, SearchSku, createSku } from '../services/skuService';
import { runCompetitorScript } from '../services/scriptService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';

const Competitors = () => {

  const [sku, setSkus] = useState();
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [loading, setLoading] = useState(false);
  const [skuName, setSkuName] = useState("");
  const [query, setQuery] = useState("");

  const fetchData = () => {
    fetchAllSku().then((res) => setSkus(res.reverse()))
  }

  const show = (severity, summary, message) => {
      toast.current.show({ severity: severity, summary: summary, detail: message });
  };

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = () => {
    createSku(skuName).then((res) => {
      if (res.message) {
        show("success", "Success", res.message)
      }
      if(res.error) {
        show("error", "Error", res.error)
      }
      setSkuName('')
      if(res) {
        fetchData()
      }
    })
  }

  const onSearch = (e) => {
    e.preventDefault()
    SearchSku(query).then((res) => {
      if(res) {
        setSkus(res)
      }
    })
  }

  const clearSearch = () => {
    SearchSku("").then((res) => {
      setQuery('')
      if(res) {
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
          <UrlTable sku={sku} setSkus={setSkus}/>
      </div>
      <Dialog header="Ajouter un SKU" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
        <div className='flex flex-col justify-center items-start gap-2'>
          <InputText value={skuName} onChange={(e) => setSkuName(e.target.value)} placeholder='A2221-ECN'/>
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