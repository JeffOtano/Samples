import { useState, useCallback, useRef } from 'react';
import { Text, Button, useToast, Image, Flex } from '@chakra-ui/react';
import { useUploadCompanyLogo } from '../../lib/media';
import { FormikProps } from 'formik';
import { CompanyFormValues } from './CompanyEditForm';

interface MediaUploadBoxProps {
    form: FormikProps<CompanyFormValues>;
}

export function MediaUploadBox({ form }: MediaUploadBoxProps) {
    const [imageUrl, setImageUrl] = useState(
        form.values.companyLogo || '/images/companyDefaultLogo.png',
    );
    const fileRef = useRef<HTMLInputElement | null>(null);
    const toast = useToast();
    const storeLogo = useUploadCompanyLogo();

    const handleFileUpload = useCallback(() => {
        const file = fileRef?.current?.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            storeLogo.mutate(file, {
                onSuccess: () => {
                    toast({
                        title: 'Logo uploaded',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                },
                onError: (error) => {
                    toast({
                        title: 'Error uploading logo',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                    throw error;
                },
            });
        }
    }, [fileRef, storeLogo, toast]);

    return (
        <Flex>
            <Flex paddingRight="15px">
                <Image
                    src={imageUrl}
                    alt={'Company Logo'}
                    height="100px"
                    width="100px"
                    border="1px solid #F5F5F6"
                    borderRadius="8px"
                />
                <input
                    type="file"
                    ref={fileRef}
                    accept="image/png, image/gif, image/jpeg"
                    hidden={true}
                    onChange={handleFileUpload}
                />
            </Flex>
            <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent={'center'}
            >
                <Text fontWeight={600} fontSize="15px" lineHeight="20px">
                    Company Logo
                </Text>
                <Button
                    size={'sm'}
                    bgColor="white"
                    mt="8px"
                    border="1px solid #E1E0E3"
                    p={'6px 10px'}
                    onClick={() => {
                        fileRef?.current?.click();
                    }}
                >
                    <Text fontWeight={600} fontSize="13px" lineHeight="16px">
                        Upload Logo
                    </Text>
                </Button>
            </Flex>
        </Flex>
    );
}
