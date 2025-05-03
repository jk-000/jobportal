import { setAllAdminCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminCompanies = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchAllAdminCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getadmincompany`, { withCredentials: true });
                if (res.data.success && res.data.companies) {
                    dispatch(setAllAdminCompanies(res.data.companies));
                } else {
                    dispatch(setAllAdminCompanies([])); // Ensure empty state update
                }
            } catch (error) {
                console.log("Error fetching companies:", error);
                dispatch(setAllAdminCompanies([])); // Set to empty array if error occurs
            }
        };

        fetchAllAdminCompanies();
    }, [dispatch]); 
};

export default useGetAllAdminCompanies;
