export declare class Validador {
    static validarTelefone(telefone: string): {
        success: boolean;
        message: any;
    } | {
        success: boolean;
        message?: undefined;
    };
    static validarEmail(email: string): {
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
    };
}
