import React, { useContext, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { appContext } from '../App';

import { deleteSku } from '../services/skuService';
import { Link } from 'react-router-dom';

const UrlTable = ({ sku, setSkus }) => {

    const toast = useRef(null);
    const context = useContext(appContext)  
    const [visible, setVisible] = useState(false);
    const [skuToDelete, setSkuToDelete] = useState();


    const onDelete = (id) => {
        deleteSku(id).then((res) => {
            if (res) {
                const newSku = sku.filter(sku => sku.id != id);
                context.fullRefreshArray(newSku)
                show("success", "Success", "Sku supprimé avec succès")
            }
        })
    }

    const actionTemplate = (item) => {

        return (
            <div className="flex flex-wrap gap-2">
                <Link to={"/sku/edit/" + item.id}><Button type="button" icon="pi pi-pencil" severity="success" rounded></Button></Link>
                <Button type="button" icon="pi pi-trash" severity="danger" rounded onClick={() => {
                    setSkuToDelete(item.id)
                    setVisible(true)
                }}></Button>
            </div>

        );
    };

    const prixFournisseurTemplate = (item) => {

        return item.prix_fournisseur ? <p>{item.prix_fournisseur}€</p> : null
    };


    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    return (
        sku ?
        <>
            <Toast ref={toast} />
            <DataTable paginator rows={15} removableSort value={sku} tableStyle={{ Width: '50rem' }} className='w-[80%]'>
                <Column sortable field="id" header="id / clé"></Column>
                <Column sortable field="name" header="Référence"></Column>
                <Column sortable header="Nombre d'urls" body={(item) => <>{item.urls ? item.urls.length : null}</>} headerClassName="w-5rem" />
                <Column sortable body={prixFournisseurTemplate} field="prix_fournisseur" header="Prix fournisseur (ref interne)"></Column>
                <Column sortable header="Actions" body={actionTemplate} headerClassName="w-5rem" />
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
        </> : null
    )
}

export default UrlTable