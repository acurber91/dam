export class Electrovalvula
{
    // Declaración de atributos de la clase.
    private _electrovalvulaId: number;
    private _nombre: string;

    // Declaración del constructor de la clase.
    constructor(electrovalvulaId, nombre)
    {
        this._electrovalvulaId = electrovalvulaId;
        this._nombre = nombre;
    }

    // Definición de getters y setters.
    public get electrovalvulaId(): number 
    {
        return this._electrovalvulaId;
    }

    public set electrovalvulaId(value: number)
    {
        this._electrovalvulaId = value;
    }

    public get nombre(): string 
    {
        return this._nombre;
    }

    public set nombre(value: string)
    {
        this._nombre = value;
    }
}