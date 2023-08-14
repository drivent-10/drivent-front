import React, { useEffect, useState } from 'react';
import Button from '../../../components/Form/Button';
import styled from 'styled-components';
import useToken from '../../../hooks/useToken';
import { getCertificate } from '../../../services/certificateApi';

export default function Certificate() {
  const token = useToken();
  const [url, setUrl] = useState('');
  const [isThereAnyCertification, setIsThereAnyCertification] = useState(false);
  async function handlePdfCreation() {
    if (url!=='') {
      window.open(url, '_blank');
    }
  }
  useEffect(async() => {
    try{
      const response = await getCertificate(token);
      if(response.status!==200) {
        setIsThereAnyCertification(false);
        throw '';
      }
      const readable = response.body.getReader();
      let check = false;
      const chunks = [];
      while (check === false) {
        let data = await readable.read();
        chunks.push(data.value);
        check = data.done;
      }
      const blob = new Blob(chunks, { type: 'application/pdf' });
      const newUrl = await URL.createObjectURL(blob);
      setUrl(() => newUrl);
      setIsThereAnyCertification(true);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return isThereAnyCertification ? (
    <CertificateContainer>
      <p>Clique no botão abaixo para gerar seu certificado de participação.</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button>GERAR CERTIFICADO</Button>
      </a>
    </CertificateContainer>
  ): <Message>O certificado ficará disponível apenas 1 dia após a realização do evento.</Message>;
}

const CertificateContainer = styled.div`
  p {
    font-size: 20px;
    color: #8e8e8e;
    margin-bottom: 23px;
    padding-top: 16px;
  }
  `;

const Message = styled.p`
color: #8e8e8e;
font-size: 20px;
line-height:23.44px;
text-align: center;
margin-top:190px;
`;
