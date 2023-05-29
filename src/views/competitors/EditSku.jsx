import { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getSingleSku, updateSku } from '../../services/skuService'
import { deleteLink } from '../../services/linksService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';

const EditSku = () => {

    const toast = useRef(null);
    let { SkuId } = useParams();
    const [toggleInput, setToggleinput] = useState(false);
    const [updatePrice, setUpdatePrice] = useState("");
    const [sku, setSku] = useState({
        id: "",
        name: "",
        prix_fournisseur: updatePrice,
        internal_ref: false,
        urls: []
    });

    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    const deleteUrl = (index, id) => {
        const newUrls = sku.urls
        newUrls.splice(index, 1)
        if(id) {
            deleteLink(id).then((res) => {
                if(res) {
                    show("success", "Success", "Url supprimé avec succès")
                    setSku({...sku, urls: [...newUrls]})
                }
            })
            return
        }
        setSku({...sku, urls: [...newUrls]})
    }

    const saveSku = () => {
        updateSku(SkuId, sku).then((res) => {
            if(res) {
                fetchData()
                show("success", "Success", sku.name + " mis à jour avec succès")
            }
        })
    }

    const updateUrl = (url , index) => {
        const newUrls = sku.urls
        newUrls[index] = {...newUrls[index], url}
        console.log({...sku, urls: [...newUrls]})
        setSku({...sku, urls: [...newUrls]})
    }

    const addUrl = () => {
        const newUrls = sku.urls
        newUrls.push({id: null, url: null})
        setSku({...sku, urls: [...newUrls]})
    }

    const fetchData = () => {
        getSingleSku(SkuId).then((res) => {
            setUpdatePrice(res.prix_fournisseur)
            setSku(res)
        })
    }

    const updatePriceSubmit = (e) => {
        e.preventDefault()
        saveSku()
        setToggleinput(false)
    }

    useEffect(() =>{
        fetchData()
    },[])

  return (
    <div className='flex flex-col w-full justify-center items-center h-auto mt-[50px]'>
        <Toast ref={toast} />
        <div className='gap-2 flex flex-col items-center'>
            <Link to="/competitors"><Button label="Retour" icon="pi pi-arrow-circle-left" severity="success" iconPos="left"/></Link>
            <Button label="Ajouter un url" icon="pi pi-plus" iconPos="right" onClick={() => addUrl()}/>
            {sku.internal_ref ? 
            toggleInput? 
                <form onSubmit={(e) => updatePriceSubmit(e)}>
                    <InputText value={sku.prix_fournisseur} onChange={(e) => setSku({...sku, prix_fournisseur: e.target.value})} placeholder='16.99' className='w-full m-4'/>
                </form>
                : <Tag onClick={() => setToggleinput(!toggleInput)} value={sku.prix_fournisseur +"€"} rounded></Tag> : null}
            
        </div>
        <div className='flex m-4'>
            <InputText value={sku.name} onChange={(e) => setSku({...sku, name: e.target.value})} placeholder='A2221-ECN' className='min-w-[280px]'/>
        </div>
        <div className='m-2 w-1/2'>
            {sku.urls ? sku.urls.map((link, index) => (
                <div key={index} className='flex m-2'>
                    <InputText value={link.url ? link.url : ""} onChange={(e) => updateUrl(e.target.value, index)} placeholder='A2221-ECN' className='w-full m-4'/>
                    <Button type="button" icon="pi pi-trash" severity="danger" className='w-full m-2' rounded onClick={() => deleteUrl(index, link.id ? link.id : null)}></Button>
                </div>
            )) : null}
        </div>
        <Button label="" icon="pi pi-save" iconPos="right" onClick={() => saveSku()}/>
  </div>
  )
}

export default EditSku