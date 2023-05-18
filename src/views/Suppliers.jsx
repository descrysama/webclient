import { Button } from 'primereact/button';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

const Suppliers = () => {

    const toast = useRef(null);
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false);

    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };


    const updateState= () => {
        setToggle(true)
        setLoading(false)
    }

    const runSupplierRequest = () => {
        if (toggle) {
            setToggle(false)
            setLoading(true)
            runSupplierScript().then((res) => {
                updateState()
                console.log(res)
                if (res.status == 200) {
                    show("success", "Success", res.message)
                    setToggle(true)
                    setLoading(false)
                }
            })
        }
    }



    return (
        <div className='w-full flex flex-col m-4 justify-center items-center gap-2'>
            <Toast ref={toast} />
            <div className='flex gap-2'>
                <Button label="Lancer le script fournisseur" icon="pi pi-check" loading={loading} onClick={() => runSupplierRequest()} />
                <a href="http://79.137.87.52/final_output.xlsx" ><Button icon="pi pi-download" severity="success" aria-label="Search" label="Télécharger le fichier" /></a>
            </div>

        </div>
    )
}

export default Suppliers