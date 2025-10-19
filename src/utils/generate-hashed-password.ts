import { hashPassword } from "../lib/login/manage_login";




(async () => {
  const minhaSenha = '1234'; // NÃO ESQUECER DE APAGAR SUA SENHA DAQUI
  const hashDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);

  console.log({ hashDaSuaSenhaEmBase64 });
})();




