import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "react-toastify";

const DeleteCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${COMPANY_API_END_POINT}/delete/${id}`,{
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            toast.success(response.data.message);
            navigate("/admin/companies");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete the company. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold mb-4">Delete Company</h2>
                <p>Are you sure you want to delete this company?</p>
                
                <div className="mt-4 flex justify-center gap-4">
                    <button 
                        className="px-4 py-2 bg-red-600 text-white rounded" 
                        onClick={handleDelete} 
                        disabled={loading}
                    >
                        {loading ? "Deleting..." : "Confirm Delete"}
                    </button>
                    <button 
                        className="px-4 py-2 bg-gray-400 text-white rounded" 
                        onClick={() => navigate("/admin/companies")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCompany;
