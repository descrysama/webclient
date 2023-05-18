import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import {
    getMobilaxLinks,
    getUtopyaLinks,
    deleteMobilaxLink,
    deleteUtopyaLink,
    createMobilaxLink,
    createUtopyaLink
} from '../services/suppliersService';

const Suppliers = () => {

    const toast = useRef(null);
    const [toggleModal, setToggleModal] = useState(false);
    const [visible, setVisible] = useState(true);
    const [toggle, setToggle] = useState(true);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [mobilax, setMobilax] = useState([]);
    const [utopya, setUtopya] = useState([]);
    const [input, setInput] = useState([]);

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

    const onSubmit = () => {
        if (visible) {
            createUtopyaLink(input).then((res) => {
                setInput('')
                if (res) {
                    fetchData()
                }
            })
        } else {
            createMobilaxLink(input).then((res) => {
                setInput('')
                if (res) {
                    fetchData()
                }
            })
        }
    }

    const runSupplierRequest = () => {
        if (toggle) {
            setToggle(false)
            setLoading(true)
            runSupplierScript().then((res) => {
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
        <>
            <Toast ref={toast} />
            <div className='w-full flex flex-col m-4 justify-center items-center gap-2'>

                <div className='flex gap-2'>
                    <Button label="Lancer le script fournisseur" icon="pi pi-check" loading={loading} onClick={() => runSupplierRequest()} />
                    <a href="http://79.137.87.52/final_output.xlsx" ><Button icon="pi pi-download" severity="success" aria-label="Search" label="Télécharger le fichier" /></a>
                </div>
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='flex gap-2'>
                        <ToggleButton onLabel="Utopya" offLabel="Mobilax" checked={visible} onChange={(e) => setVisible(!visible)} className='max-w-[40%]' />
                        <Button label="Ajouter" icon="pi pi-plus" iconPos="right" onClick={() => setToggleModal(true)} />
                    </div>
                    <div className='flex flex-col w-full justify-center items-center mt-4'>
                        <DataTable className={visible ? "visible w-[80%]" : 'hidden'} removableSort value={utopya} tableStyle={{ Width: '50rem' }}>
                            <Column sortable field="id" header="id / clé"></Column>
                            <Column sortable field="url" header="URL" className='max-w-[400px] truncate'></Column>
                            <Column sortable header="Actions" body={actionTemplate} headerClassName="w-5rem" />
                        </DataTable>
                        <DataTable className={!visible ? "visible w-[80%]" : 'hidden'} removableSort value={mobilax} tableStyle={{ Width: '50rem' }}>
                            <Column sortable field="id" header="id / clé"></Column>
                            <Column sortable field="url" header="URL" className='max-w-[400px] truncate'></Column>
                            <Column sortable header="Actions" body={actionTemplate} headerClassName="w-5rem" />
                        </DataTable>
                    </div>
                </div>
                <Dialog header={"Ajouter un URL pour " + (visible ? 'Utopya' : 'Mobilax')} visible={toggleModal} style={{ width: '30vw' }} onHide={() => setToggleModal(false)}>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <InputText value={input} onChange={(e) => setInput(e.target.value)} placeholder='http://le-site-cible.com/hihi-destruction' />
                        <div>
                            <Button style={{ marginTop: '3px', marginRight: '5px' }} label="Annuler" icon="pi pi-times" iconPos="right" severity="danger" onClick={() => setToggleModal(false)} />
                            <Button style={{ marginTop: '3px' }} label="Ajouter" icon="pi pi-pi-add" iconPos="right" severity="success" onClick={() => {
                                setToggleModal(false)
                                onSubmit()
                            }} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default Suppliers