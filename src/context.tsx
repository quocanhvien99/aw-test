import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext<any>(null);

export interface ISubCampaign {
    name: string;
    status: boolean;
    ads: Array<{
        name: string;
        quantity: number;
    }>;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [information, setInformation] = useState({ name: '', describe: '' });
    const [subCampaigns, setSubCampaigns] = useState<Array<ISubCampaign>>([
        {
            name: 'Chiến dịch con 1',
            status: true,
            ads: [
                {
                    name: 'Quảng cáo 1',
                    quantity: 0,
                },
            ],
        },
    ]);

    const [submited, setSubmited] = useState(false);
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleSubmit = () => {
        try {
            // validate information
            if (!information.name || !information.describe) {
                errors['information'] = true;
                throw Error();
            }

            // validate subCampaigns
            for (const sc of subCampaigns) {
                if (!sc.name || !sc.ads.length) {
                    throw Error();
                }

                // validate ads
                for (const ad of sc.ads) {
                    if (!ad.name || !ad.quantity) throw Error();
                }
            }
        } catch (e) {
            window.alert('Vui lòng điển đầy đủ thông tin');
            return setSubmited(true);
        }
        setSubmited(false);
        window.alert(
            'Thêm thành công chiến dịch\n' +
                JSON.stringify({
                    campaign: {
                        information,
                        subCampaigns,
                    },
                })
        );
    };

    useEffect(() => {
        const errors: any = {};
        for (let i = 0; i < subCampaigns.length; i++) {
            if (!subCampaigns[i].name || !subCampaigns[i].ads.length) {
                errors[`subCampaigns.${i}`] = true;
            }

            for (let j = 0; j < subCampaigns[i].ads.length; j++) {
                if (
                    !subCampaigns[i].ads[j].name ||
                    !subCampaigns[i].ads[j].quantity
                ) {
                    errors[`subCampaigns.${i}`] = true;
                }
            }
        }
        setErrors(errors);
    }, [information, subCampaigns]);

    return (
        <AppContext.Provider
            value={{
                information,
                setInformation,
                subCampaigns,
                setSubCampaigns,
                submited,
                handleSubmit,
                errors,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
