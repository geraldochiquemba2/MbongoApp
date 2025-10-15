import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Mbongo <onboarding@resend.dev>',
      to: [email],
      subject: 'Bem-vindo à Newsletter Mbongo',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb; font-size: 24px; margin-bottom: 20px;">
            Bem-vindo à Newsletter Mbongo!
          </h1>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            Obrigado por se inscrever na nossa newsletter!
          </p>
          
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 15px;">
            A partir de agora, você receberá atualizações exclusivas sobre:
          </p>
          
          <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin-bottom: 20px;">
            <li>Novas oportunidades de investimento no mercado angolano</li>
            <li>Ofertas de Títulos do Tesouro com melhores taxas</li>
            <li>IPOs e novas ações na BODIVA</li>
            <li>Análises e notícias do mercado financeiro</li>
            <li>Dicas educacionais sobre investimentos</li>
          </ul>
          
          <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0;">
            <p style="color: #1e40af; font-size: 14px; margin: 0;">
              <strong>Dica:</strong> Visite nossa plataforma para aprender mais sobre investimentos, 
              simular cenários e descobrir onde comprar seus primeiros ativos.
            </p>
          </div>
          
          <a href="https://mbongo.replit.app" 
             style="display: inline-block; background-color: #2563eb; color: white; 
                    padding: 12px 24px; text-decoration: none; border-radius: 6px; 
                    font-size: 16px; margin-top: 10px;">
            Visitar Plataforma Mbongo
          </a>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="color: #6b7280; font-size: 12px; line-height: 1.4;">
            Você está recebendo este email porque se inscreveu na newsletter da Mbongo.<br>
            Se não deseja mais receber nossas atualizações, entre em contato conosco.
          </p>
          
          <p style="color: #9ca3af; font-size: 12px; margin-top: 10px;">
            © 2024 Mbongo - Plataforma Educativa de Investimentos
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    console.log('Welcome email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending welcome email:', error);
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
    const { data, error } = await resend.emails.send({
      from: 'Mbongo Oportunidades <onboarding@resend.dev>',
      to: subscribers,
      subject: `Nova Oportunidade: ${opportunity.title}`,
      html: `
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
      `,
    });

    if (error) {
      console.error('Error sending investment opportunity email:', error);
      return { success: false, error };
    }

    console.log('Investment opportunity email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending investment opportunity email:', error);
    return { success: false, error };
  }
}
