import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { Languages, Save, X } from 'lucide-react';

const AddSnippet = () => {
    const nanavigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        language: '',
        code: '',
        tags:''
    });
    
}