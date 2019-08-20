const dddsBrasileiros = {
	estadoPorDdd: {
		'11': 'SP',
		'12': 'SP',
		'13': 'SP',
		'14': 'SP',
		'15': 'SP',
		'16': 'SP',
		'17': 'SP',
		'18': 'SP',
		'19': 'SP',
		'21': 'RJ',
		'22': 'RJ',
		'24': 'RJ',
		'27': 'ES',
		'28': 'ES',
		'31': 'MG',
		'32': 'MG',
		'33': 'MG',
		'34': 'MG',
		'35': 'MG',
		'37': 'MG',
		'38': 'MG',
		'41': 'PR',
		'42': 'PR',
		'43': 'PR',
		'44': 'PR',
		'45': 'PR',
		'46': 'PR',
		'47': 'SC',
		'48': 'SC',
		'49': 'SC',
		'51': 'RS',
		'53': 'RS',
		'54': 'RS',
		'55': 'RS',
		'61': 'DF',
		'62': 'GO',
		'63': 'TO',
		'64': 'GO',
		'65': 'MT',
		'66': 'MT',
		'67': 'MS',
		'68': 'AC',
		'69': 'RO',
		'71': 'BA',
		'73': 'BA',
		'74': 'BA',
		'75': 'BA',
		'77': 'BA',
		'79': 'SE',
		'81': 'PE',
		'82': 'AL',
		'83': 'PB',
		'84': 'RN',
		'85': 'CE',
		'86': 'PI',
		'87': 'PE',
		'88': 'CE',
		'89': 'PI',
		'91': 'PA',
		'92': 'AM',
		'93': 'PA',
		'94': 'PA',
		'95': 'RR',
		'96': 'AP',
		'97': 'AM',
		'98': 'MA',
		'99': 'MA',
	},

	dddsPorEstado: {
		AC: ['68'],
		AL: ['82'],
		AM: ['92', '97'],
		AP: ['96'],
		BA: ['71', '73', '74', '75', '77'],
		CE: ['85', '88'],
		DF: ['61'],
		ES: ['27', '28'],
		GO: ['62', '64'],
		MA: ['98', '99'],
		MG: ['31', '32', '33', '34', '35', '37', '38'],
		MS: ['67'],
		MT: ['65', '66'],
		PA: ['91', '93', '94'],
		PB: ['83'],
		PE: ['81', '87'],
		PI: ['86', '89'],
		PR: ['41', '42', '43', '44', '45', '46'],
		RJ: ['21', '22', '24'],
		RN: ['84'],
		RO: ['69'],
		RR: ['95'],
		RS: ['51', '53', '54', '55'],
		SC: ['47', '48', '49'],
		SE: ['79'],
		SP: ['11', '12', '13', '14', '15', '16', '17', '18', '19'],
		TO: ['63'],
	},
};
const blackList = {
	telefones: [
		'12345678909',
		'00000000000',
		'11111111111',
		'22222222222',
		'33333333333',
		'44444444444',
		'55555555555',
		'66666666666',
		'77777777777',
		'88888888888',
		'99999999999',
	],
};

const regexEmail = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i);

export class Validador {
	static validarTelefone(telefone: string) {
		const telNumero = telefone.replace(/\D/g, '');

		try {
			Regras.blackList(telNumero);
			Regras.dddValido(telNumero);

			if (telNumero.length === 10) {
				Regras.tem10Numeros(telNumero);
			} else {
				Regras.tem11Numeros(telNumero);
				Regras.primeiroNumero9(telNumero);
			}
		} catch (error) {
			return { success: false, message: error };
		}

		return { success: true };
	}

	// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
	static validarEmail(email: string) {
		const regexOk = regexEmail.test(email.trim());

		if (regexOk) {
			return { success: true };
		}

		return { success: false, message: 'Email inválido' };
	}
}

class Regras {
	static blackList(telefone: string) {
		if (blackList.telefones.includes(telefone)) {
			throw 'Telefone inválido';
		}
	}

	static tem11Numeros(telefone: string) {
		if (telefone.length > 11) {
			throw 'Telefone com mais de 11 dígitos';
		} else if (telefone.length < 11) {
			throw 'Telefone com menos de 11 dígitos';
		}
	}

	static tem10Numeros(telefone: string) {
		if (telefone.length > 10) {
			throw 'Telefone com mais de 10 dígitos';
		} else if (telefone.length < 10) {
			throw 'Telefone com menos de 10 dígitos';
		}
	}

	static dddValido(telefone: string) {
		const ddd = telefone.substring(0, 2);

		if (!dddsBrasileiros.estadoPorDdd.hasOwnProperty(ddd)) {
			throw 'DDD inválido';
		}
	}

	static primeiroNumero9(telefone: string) {
		const primeiroNumero = telefone.substring(2, 3);

		if ('9' !== primeiroNumero) {
			throw 'Telefone não começa com 9';
		}
	}
}
