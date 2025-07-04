import { User, Mail, Phone, MapPin, FileText } from "lucide-react";
import React from "react";
import type { UserProfile } from "../types/UserProfile"; // ajusta la ruta según tu estructura


interface Props {
    userProfile: UserProfile;
    setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
    isEditing: boolean;
    isIndividual: boolean;
    isEmpresa: boolean;
    isEquipo: boolean;
    photo: File | null;
    setPhoto: (file: File | null) => void;
}

const PersonalInfo: React.FC<Props> = ({
    userProfile,
    setUserProfile,
    isEditing,
    isIndividual,
    isEmpresa,
    isEquipo,
    photo,
    setPhoto
}) => {
    return (
        <div className="bg-white shadow rounded p-6 mb-6">
            <h2 className="text-[#667233] text-xl font-semibold mb-4">Información Personal</h2>

            <div className="flex justify-center mb-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#667233] bg-gray-100 shadow">
                    {photo ? (
                        <img src={URL.createObjectURL(photo)} alt="Foto de perfil" className="object-cover w-full h-full" />
                    ) : userProfile.fotoPerfil ? (
                        <img src={userProfile.fotoPerfil} alt="Foto de perfil" className="object-cover w-full h-full" />
                    ) : (
                        <User className="text-gray-400 w-12 h-12 m-auto mt-8" />
                    )}
                </div>
            </div>

            {isEditing && (
                <div className="flex justify-center mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                        className="file:bg-[#667233] file:text-white file:py-1 file:px-4 file:rounded file:border-none"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    {
                        icon: <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
                        name: "username",
                        type: "text",
                        value: userProfile.username,
                        placeholder: "Nombre de usuario",
                    },
                    {
                        icon: <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
                        name: "name",
                        type: "text",
                        value: userProfile.name,
                        placeholder: "Nombre completo",
                    },
                    {
                        icon: <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
                        name: "email",
                        type: "email",
                        value: userProfile.email,
                        placeholder: "Correo",
                    },
                    {
                        icon: <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
                        name: "phone",
                        type: "tel",
                        value: userProfile.phone,
                        placeholder: "Teléfono",
                    },
                    {
                        icon: <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />,
                        name: "address",
                        type: "text",
                        value: userProfile.address,
                        placeholder: "Dirección",
                    },
                ].map((field) => (
                    <div className="relative" key={field.name}>
                        {field.icon}
                        <input
                            name={field.name}
                            type={field.type}
                            value={field.value}
                            onChange={(e) =>
                                setUserProfile({ ...userProfile, [field.name]: e.target.value })
                            }
                            disabled={!isEditing}
                            placeholder={field.placeholder}
                            className="pl-10 border w-full rounded py-2"
                        />
                    </div>
                ))}

                {!isIndividual && (isEmpresa || isEquipo) && (
                    <>
                        {(["companyName", "nit"] as (keyof UserProfile)[]).map((field) => (
                            <div className="relative" key={field}>
                                <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <input
                                    name={field}
                                    type="text"
                                    value={userProfile[field]}
                                    onChange={(e) =>
                                        setUserProfile({ ...userProfile, [field]: e.target.value })
                                    }
                                    disabled={isEquipo || !isEditing}
                                    placeholder={field === "companyName" ? "Nombre de la empresa" : "NIT"}
                                    className={`pl-10 border w-full rounded py-2 ${isEquipo ? "bg-gray-100 text-gray-500" : ""
                                        }`}
                                />
                                {isEquipo && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Este campo no se puede modificar
                                    </p>
                                )}
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonalInfo;
