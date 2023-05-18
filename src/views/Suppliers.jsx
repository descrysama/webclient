import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { getMobilaxLinks, getUtopyaLinks, deleteMobilaxLink, deleteUtopyaLink } from '../services/suppliersService';

const Suppliers = () => {

    const toast = useRef(null);
    const [visible, setVisible] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [mobilax, setMobilax] = useState([]);
    const [utopya, setUtopya] = useState([]);

    const show = (severity, summary, message) => {
        toast.current.show({ severity: severity, summary: summary, detail: message });
    };

    const fetchData = () => {
        getMobilaxLinks().then((res) => setMobilax(res))
        getUtopyaLinks().then((res) => setUtopya(res))
    }

    const onDelete = (id) => {
        if (visible) {
            deleteUtopyaLink(id).then((res) => {
                if (res) {
                    const newUtopyaArray = utopya.filter(url => url.id != id);
                    setUtopya(newUtopyaArray)
                    show("success", "Success", "URL supprimé avec succès")
                }
            })
        } else {
            deleteMobilaxLink(id).then((res) => {
                if (res) {
                    const newMobilaxArray = utopya.filter(url => url.id != id);
                    setUtopya(newMobilaxArray)
                    show("success", "Success", "URL supprimé avec succès")
                }
            })
        }
        fetchData()
    }

    const actionTemplate = (item) => {

        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-trash" severity="danger" rounded onClick={() => onDelete(item.id)}></Button>
            </div>

        );
    };

    useEffect(() => {
        fetchData();
    }, [])


    const updateState = () => {
        setToggle(true)
        setLoading(false)
    }

    const runSupplierRequest = () => {
        if (toggle) {
            setToggle(false)
            setLoading(true)
            runSupplierScript().then((res) => {
                updateState()
                if(res.message) {
                    show("success", "Success", res.message)
                } else {
                    show("error", "Error", res.error)
                }
            })
        }
    }



    return (
        <>
            <Toast ref={toast} />
            <div className='w-full flex flex-col m-4 justify-center items-center gap-2'>

                <div className='flex gap-2'>
                    <Button label="Lancer le script fournisseur" icon="pi pi-check" loading={loading} onClick={() => runSupplierRequest()} />
                    <a href="http://79.137.87.52/final_output.xlsx" ><Button icon="pi pi-download" severity="success" aria-label="Search" label="Télécharger le fichier" /></a>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <ToggleButton onLabel="Utopya" offLabel="Mobilax" checked={visible} onChange={(e) => setVisible(!visible)} className='max-w-[40%]' />
                    <div className='flex flex-col w-full justify-center items-center mt-4'>
                        <DataTable className={visible ? "visible w-[80%]" : 'hidden'} removableSort value={utopya} tableStyle={{ Width: '50rem' }}>
                            <Column sortable field="id" header="id / clé"></Column>
                            <Column sortable field="url" header="URL" className='max-w-[400px] truncate'></Column>
                            <Column sortable body={actionTemplate} headerClassName="w-5rem" />
                        </DataTable>
                        <DataTable className={!visible ? "visible w-[80%]" : 'hidden'} removableSort value={mobilax} tableStyle={{ Width: '50rem' }}>
                            <Column sortable field="id" header="id / clé"></Column>
                            <Column sortable field="url" header="URL" className='max-w-[400px] truncate'></Column>
                            <Column sortable body={actionTemplate} headerClassName="w-5rem" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Suppliers