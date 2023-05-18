import { Button } from 'primereact/button';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

const Suppliers = () => {

    const toast = useRef(null);
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false);

    const runSupplierRequest = () => {
        if(toggle) {
            setToggle(false)
            setLoading(true)
            runSupplierScript().then(() => {
                show("success", "Success", "Site fournisseur scanné avec succès. ")
                setToggle(true)
                setLoading(false)
            })
        }
    }

    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    return (
        <div className='w-full m-4 justify-center items-center'>
            <Toast ref={toast} />
            <Button label="Lancer le script fournisseur" icon="pi pi-check" loading={loading} onClick={() => runSupplierRequest()} />
        </div>
    )
}

export default Suppliers