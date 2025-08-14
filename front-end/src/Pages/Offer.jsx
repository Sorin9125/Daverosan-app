// import OffersTable from "../Components/Tables/OffersTable";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import Modal from "../Components/Modal/Modal";

function Offers() {
//     const [offersData, setOffersData] = useState([]);
//     const [offerId, setOfferId] = useState(null);
//     const [updateModal, setUpdateModal] = useState(false);
//     const [updateData, setUpdateData] = useState({
//         price: null,
//         deadline: new Date()
//     })
//     const [deleteModal, setDeleteModal] = useState(false);

//     const fetchOffers = useCallback(() => {
//         const getOffers = async () => {
//             try {
//                 const offers = await axios.get(`${import.meta.env.VITE_API}/offer/getAllOffers`);
//                 setOffersData(offers.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         }
//         getOffers();
//     }, [])

//     useEffect(fetchOffers, [fetchOffers]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUpdateData((prev) => ({ ...prev, [name]: value }));
//     }

//     const openUpdateModal = (offer) => {
//         setUpdateData({
//             price: offer.price,
//             deadline: offer.deadline,
//         })
//         setUpdateModal(true);
//         setOfferId(offer.id);
//     }

//     const updateOffer = async () => {
//         try {
//             const response = await axios.put(`${import.meta.env.VITE_API}/offer/updateOffer/${offerId}`, {
//                 price: updateData.price,
//                 deadline: updateData.deadline,
//             }, {
//                 withCredentials: true,
//             });
//             toast.success(response.data.message);
//             setOffersData(prev => prev.map((offer) =>
//                 offer.id == offerId ? {
//                     ...offer,
//                     price: updateData.price,
//                     deadline: updateData.deadline,
//                 } : offer
//             ));
//             setUpdateData({
//                 deadline: new Date(),
//                 price: null,
//             });
//             setUpdateModal(false);
//         } catch (err) {
//             toast.error(err.response.data.message);
//         }
//     }

//     const openDeleteModal = (id) => {
//         setDeleteModal(true);
//         setOfferId(id);
//     }

//     const deleteOffer = async () => {
//         try {
//             const response = await axios.delete(`${import.meta.env.VITE_API}/offer/deleteOffer/${offerId}`, {
//                 withCredentials: true,
//             });
//             toast.success(response.data.message);
//             fetchOffers();
//             setDeleteModal(false);
//         } catch (err) {
//             toast.error(err.response.data.message);
//         }
//     }

//     return (
//         <>
//             <h1>Oferte</h1>
//             <OffersTable offers={offersData} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
//             {/* Modala pentru actualizat oferta */}
//             <Modal isOpen={updateModal} isClosed={() => setUpdateModal(false)}>
//                 <h2>Actualizare ofertă</h2>
//                 <div className="form">
//                     <form action={updateOffer}>
//                         <div className="field">
//                             <label>Introduceți valoarea ofertei (în euro)
//                                 <input
//                                     type="number"
//                                     name="price"
//                                     value={updateData.price}
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                         </div>
//                         <div className="field">
//                             <label>Introduceți termenul de finalizare
//                                 <input
//                                     type="date"
//                                     name="deadline"
//                                     value={new Date(updateData.deadline).toISOString().split("T")[0]}
//                                     onChange={handleChange}
//                                 />
//                             </label>
//                         </div>
//                         <button type="submit" onClick={(e) => { e.preventDefault(); updateOffer() }}>Salvează</button>
//                     </form>
//                 </div>
//             </Modal>
//             {/* Modala pentru sters oferta */}
//             <Modal isOpen={deleteModal} isClosed={() => setDeleteModal(false)}>
//                 <h2>Șterge oferta</h2>
//                 <p>Sunteți sigur că vreți să ștergeți această ofertă?</p>
//                 <button onClick={(e) => { e.preventDefault(); deleteOffer() }}>Da</button>
//                 <button className="cancel-button" onClick={() => setDeleteModal(false)}>Anulează</button>
//             </Modal>
//         </>
//     )
}

export default Offers;