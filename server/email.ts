import * as brevo from '@getbrevo/brevo';

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '');

export async function sendWelcomeEmail(email: string) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Mbongo', email: 'noreply@sendinblue.com' };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = 'Bem-vindo à +Mbongo - Seu guia no mercado de investimentos';
    sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 20px;">
            Bem-vindo à +Mbongo! 🎯
          </h1>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Obrigado por se juntar à nossa comunidade de investidores! A partir de agora, você terá acesso a informações exclusivas sobre o mercado angolano.
          </p>

          <div style="background-color: #f0f9ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="color: #0369a1; font-size: 18px; margin-bottom: 12px;">
              📊 Sobre o Mercado Angolano
            </h2>
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-bottom: 10px;">
              O mercado financeiro angolano está em constante crescimento, oferecendo diversas oportunidades:
            </p>
            <ul style="color: #374151; font-size: 15px; line-height: 1.7; margin: 0;">
              <li><strong>Títulos do Tesouro:</strong> Investimentos seguros com taxas competitivas</li>
              <li><strong>BODIVA:</strong> Bolsa de valores com empresas angolanas promissoras</li>
              <li><strong>IPOs:</strong> Oportunidades de entrar em empresas desde o início</li>
            </ul>
          </div>

          <div style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="color: #92400e; font-size: 18px; margin-bottom: 12px;">
              💡 O que é a +Mbongo?
            </h2>
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0;">
              A <strong>+Mbongo</strong> é a sua plataforma educativa sobre investimentos em Angola. Oferecemos:
            </p>
            <ul style="color: #374151; font-size: 15px; line-height: 1.7; margin-top: 10px;">
              <li>📚 Conteúdo educativo sobre como investir</li>
              <li>🧮 Simuladores para planejar seus investimentos</li>
              <li>📈 Análises do mercado e oportunidades atuais</li>
              <li>🏦 Guias de onde e como comprar ativos financeiros</li>
            </ul>
          </div>
          
          <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <p style="color: #1e40af; font-size: 14px; margin: 0;">
              <strong>💼 Próximos passos:</strong> Explore nossa plataforma para aprender sobre investimentos, 
              simular cenários e descobrir as melhores oportunidades no mercado angolano!
            </p>
          </div>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 20px 0;">
            <strong>Você receberá atualizações sobre:</strong>
          </p>
          <ul style="color: #374151; font-size: 15px; line-height: 1.8; margin-bottom: 20px;">
            <li>✉️ Novas oportunidades de investimento</li>
            <li>📊 Análises e tendências do mercado</li>
            <li>📰 Notícias importantes do setor financeiro</li>
            <li>🎓 Dicas e educação financeira</li>
          </ul>
          
          <a href="https://mbongo.replit.app" 
             style="display: inline-block; background-color: #2563eb; color: white; 
                    padding: 14px 28px; text-decoration: none; border-radius: 6px; 
                    font-size: 16px; font-weight: bold; margin: 20px 0;">
            Explorar Plataforma +Mbongo
          </a>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px; line-height: 1.4;">
            Você está recebendo este email porque se inscreveu na newsletter da +Mbongo.<br>
            Se não deseja mais receber nossas atualizações, entre em contato conosco.
          </p>
          
          <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
            © 2024 +Mbongo - Plataforma Educativa de Investimentos em Angola
          </p>
        </div>
      `;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Welcome email sent successfully via Brevo:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email via Brevo:', error);
    return { success: false, error };
  }
}

export async function sendInvestmentOpportunityEmail(
  subscribers: string[],
  opportunity: {
    title: string;
    description: string;
    type: string;
    return_rate?: string;
    link?: string;
  }
) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { name: 'Mbongo Oportunidades', email: 'noreply@sendinblue.com' };
    sendSmtpEmail.to = subscribers.map(email => ({ email }));
    sendSmtpEmail.subject = `Nova Oportunidade: ${opportunity.title}`;
    sendSmtpEmail.htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 20px;">
            Nova Oportunidade de Investimento
          </h1>
          
          <div style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
            <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 10px;">
              ${opportunity.title}
            </h2>
            
            <p style="color: #4b5563; font-size: 14px; margin-bottom: 5px;">
              <strong>Tipo:</strong> ${opportunity.type}
            </p>
            
            ${opportunity.return_rate ? `
              <p style="color: #059669; font-size: 16px; font-weight: bold; margin: 10px 0;">
                Rentabilidade: ${opportunity.return_rate}
              </p>
            ` : ''}
            
            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-top: 15px;">
              ${opportunity.description}
            </p>
          </div>
          
          ${opportunity.link ? `
            <a href="${opportunity.link}" 
               style="display: inline-block; background-color: #2563eb; color: white; 
                      padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                      font-size: 16px; margin-top: 10px;">
              Ver Mais Detalhes
            </a>
          ` : ''}
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px;">
            © 2024 Mbongo - Plataforma Educativa de Investimentos
          </p>
        </div>
      `;

    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Investment opportunity email sent successfully via Brevo:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending investment opportunity email via Brevo:', error);
    return { success: false, error };
  }
}
