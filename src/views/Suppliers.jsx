import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { runSupplierScript } from '../services/scriptService';
import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { ToggleButton } from 'primereact/togglebutton';
import { getMobilaxLinks, getUtopyaLinks } from '../services/suppliersService';

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

    const actionTemplate = (item) => {

        return (
            <div className="flex flex-wrap gap-2">
                <Button type="button" icon="pi pi-trash" severity="danger" rounded onClick={() => console.log("bouton")}></Button>
                <Link to={"/sku/edit/" + item.id}><Button type="button" icon="pi pi-pencil" severity="success" rounded></Button></Link>
            </div>

        );
    };

    useEffect(() => {
        fetchData();
    }, [])


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
                show("success", "Success", res.message)
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
                    <ToggleButton onLabel="Utopya" offLabel="Mobilax" checked={visible} onChange={(e) => setVisible(!visible)} className='max-w-[40%]'/>
                    <div className='flex flex-col w-full justify-center items-center'>
                        <DataTable className={visible ? "visible w-[80%]": 'hidden'} removableSort value={mobilax} tableStyle={{ Width: '50rem' }}>
                            <Column sortable field="id" header="id / clé"></Column>
                            <Column sortable field="name" header="Référence"></Column>
                            <Column sortable header="Nombre d'urls" body={(item) => <>{item.urls ? item.urls.length : null}</>} headerClassName="w-5rem" />
                            <Column sortable body={actionTemplate} headerClassName="w-5rem" />
                        </DataTable>
                        <DataTable className={!visible ? "visible w-[80%]": 'hidden'} removableSort value={utopya} tableStyle={{ Width: '50rem' }}>
                            <Column sortable field="id" header="id / clé"></Column>
                            <Column sortable field="name" header="Référence"></Column>
                            <Column sortable header="Nombre d'urls" body={(item) => <>{item.urls ? item.urls.length : null}</>} headerClassName="w-5rem" />
                            <Column sortable body={actionTemplate} headerClassName="w-5rem" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Suppliers