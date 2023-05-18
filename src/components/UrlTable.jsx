import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';


import { deleteSku } from '../services/skuService';
import { Link } from 'react-router-dom';

const UrlTable = ({sku, setSkus}) => {

    const toast = useRef(null);

    
    
    const onDelete = (id) => {
        deleteSku(id).then((res) => {
            if(res) {
                const newSku = sku.filter(sku => sku.id != id);
                setSkus(newSku)
                show("success", "Success", "Sku supprimé avec succès")
            }
        })
    }

    const actionTemplate = (item) => {

        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-trash" severity="danger" rounded onClick={() => onDelete(item.id)}></Button>
                <Link to={"/sku/edit/" + item.id}><Button type="button" icon="pi pi-pencil" severity="success" rounded></Button></Link>
            </div>
            
        );
    };


    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    return (
        <>
            <Toast ref={toast} />
            <DataTable value={sku} tableStyle={{ Width: '50rem' }} className='w-[80%]'>
                    <Column field="id" header="id / clé"></Column>
                    <Column field="name" header="Référence"></Column>
                    <Column header="Nombre d'urls" body={(item) => <>{item.urls ? item.urls.length : null}</>} headerClassName="w-5rem" />
                    <Column body={actionTemplate} headerClassName="w-5rem" />
            </DataTable>
        </>
    )
}

export default UrlTable