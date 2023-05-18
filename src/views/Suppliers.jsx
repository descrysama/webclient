import { Button } from 'primereact/button';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';

const Suppliers = () => {

    const toast = useRef(null);
    let toggle = true
    let loading = false

    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    // useEffect(() => {
    //     setToggle(true)
    //     setLoading(false)
    // }, [show])

    const runSupplierRequest = () => {
        if (toggle) {
            toggle = true
            loading = true
            runSupplierScript().then((res) => {
                if (res.status == 200) {
                    show("success", "Success", res.message)
                    toggle = true
                    loading = false
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