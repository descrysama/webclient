import { Button } from 'primereact/button';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';

const Suppliers = () => {

    const toast = useRef(null);

    const runSupplierRequest = () => {
        runSupplierScript().then(() => {
            show("success", "Success", "Site fournisseur scanné avec succès. ")
        })
    }

    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    return (
        <div className='w-full m-4 justify-center items-center'>
            <Toast ref={toast} />
            <Button label="Lancer le script fournisseur" icon="pi pi-plus" iconPos="right" onClick={() => runSupplierRequest()} />
        </div>
    )
}

export default Suppliers