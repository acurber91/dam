export class Riego
{
    // Declaración de atributos de la clase.
    private _logRiegoId: number;
    private _apertura: number;
    private _fecha: Date;
    private _electrovalvulaId: number;

    // Declaración del constructor de la clase.
    constructor(logRiegoId, apertura, fecha, electrovalvulaId)
    {
        this._logRiegoId = logRiegoId;
        this._apertura = apertura;
        this._fecha = fecha;
        this._electrovalvulaId = electrovalvulaId;
    }

    // Definición de getters y setters.
    public get logRiegoId(): number 
    {
        return this._logRiegoId;
    }

    public set logRiegoId(value: number)
    {
        this._logRiegoId = value;
    }

    public get apertura(): number 
    {
        return this._apertura;
    }

    public set apertura(value: number)
    {
        this._apertura = value;
    }

    public get fecha(): Date 
    {
        return this._fecha;
    }

    public set fecha(value: Date)
    {
        this._fecha = value;
    }

    public get electrovalvulaId(): number 
    {
        return this._electrovalvulaId;
    }

    public set electrovalvulaId(value: number)
    {
        this._electrovalvulaId = value;
    }
}