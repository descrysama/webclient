import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

import { deleteSku } from '../services/skuService';
import { Link } from 'react-router-dom';

const UrlTable = ({ sku, setSkus }) => {

    const toast = useRef(null);
    const [visible, setVisible] = useState(false);
    const [skuToDelete, setSkuToDelete] = useState();


    const onDelete = (id) => {
        console.log(id)
        deleteSku(id).then((res) => {
            if (res) {
                const newSku = sku.filter(sku => sku.id != id);
                setSkus(newSku)
                show("success", "Success", "Sku supprimé avec succès")
            }
        })
    }

    const actionTemplate = (item) => {

        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-trash" severity="danger" rounded onClick={() => {
                    setSkuToDelete(item.id)
                    setVisible(true)
                }}></Button>
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
            <Dialog header="Supprimer" visible={visible} style={{ width: '30vw' }} onHide={() => setVisible(false)}>
                <div className='flex flex-col justify-center items-start gap-2'>
                        <p>Voulez vous vraiment supprimer ce SKU ? </p>
                        <p>Tout ses liens seront aussi supprimés.</p>
                    <div>
                        <Button style={{ marginTop: '3px', marginRight: '5px' }} label="Annuler" icon="pi pi-times" iconPos="right" onClick={() => setVisible(false)} />
                        <Button style={{ marginTop: '3px' }} label="Supprimer" icon="pi pi-trash" iconPos="right" severity="danger" onClick={() => {
                            setVisible(false)
                            onDelete(skuToDelete)
                        }} />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default UrlTable