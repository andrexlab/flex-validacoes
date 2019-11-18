const assert = require('assert');
const { Validador } = require('../dist/index');

describe('Telefone Fixo', function() {
	describe('Telefone OK', function() {
		it('Deve ter o Telefone OK', function() {
			const res = Validador.validarTelefone('48 32324545');

			assert.equal(res.success, true);
		});
	});

	describe('DDD não OK', function() {
		it('Deve dar erro no DDD', function() {
			const res = Validador.validarTelefone('01 32324545');

			assert.equal(res.success, false);
			assert.equal(res.message, 'DDD inválido');
		});
	});
});

describe('Telefone Celular', function() {
	describe('Telefone OK', function() {
		it('Deve ter o Telefone OK', function() {
			const res = Validador.validarTelefone('48 999616548');

			assert.equal(res.success, true);
		});
	});

	describe('Telefone inválido', function() {
		it('Deve dar erro no DDD', function() {
			const res = Validador.validarTelefone('12345678909');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Telefone inválido');
		});
	});

	describe('DDD não OK', function() {
		it('Deve dar erro no DDD', function() {
			const res = Validador.validarTelefone('01 999616548');

			assert.equal(res.success, false);
			assert.equal(res.message, 'DDD inválido');
		});
	});

	describe('Quantidade maior que 11', function() {
		it('Deve dar erro na quantidade', function() {
			const res = Validador.validarTelefone('48 9996165488');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Telefone com mais de 11 dígitos');
		});
	});

	describe('Quantidade menor que 11', function() {
		it('Deve dar erro na quantidade', function() {
			const res = Validador.validarTelefone('48 999688');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Telefone com menos de 11 dígitos');
		});
	});
});

describe('Teste email', function() {
	describe('Email OK', function() {
		it('Deve ter o Email OK .com', function() {
			const res = Validador.validarEmail('zignd.igor@gmail.com');

			assert.equal(res.success, true);
		});
	});

	describe('Email OK', function() {
		it('Deve ter o Email OK .com.br', function() {
			const res = Validador.validarEmail('zignd.igor@gmail.com.br');

			assert.equal(res.success, true);
		});
	});

	describe('Email OK', function() {
		it('Deve ter o Email OK com . _ +', function() {
			const res = Validador.validarEmail('zi+gnd.ig_or@gmail.com.br');

			assert.equal(res.success, true);
		});
	});

	describe('Email não OK', function() {
		it('Deve dar erro no email', function() {
			const res = Validador.validarEmail('zignd.igor@gmail.com.br.br');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Email inválido');
		});
	});

	describe('Email não OK', function() {
		it('Deve dar erro no email', function() {
			const res = Validador.validarEmail('zignd.igor@gmail.');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Email inválido');
		});
	});

	describe('Email não OK', function() {
		it('Deve dar erro no email', function() {
			const res = Validador.validarEmail('zignd.igor@gmailcom');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Email inválido');
		});
	});

	describe('Email não OK', function() {
		it('Deve dar erro no email', function() {
			const res = Validador.validarEmail('zignd.igorgmail.com ');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Email inválido');
		});
	});

	describe('Email não OK', function() {
		it('Deve dar erro no email', function() {
			const res = Validador.validarEmail('@gmail.com');

			assert.equal(res.success, false);
			assert.equal(res.message, 'Email inválido');
		});
	});
});
