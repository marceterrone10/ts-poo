import bcrypt from 'bcrypt';

export class HashPassword {
    private readonly saltRounds: number;
    constructor(rounds: number){
        this.saltRounds = rounds
    }

    async hashing(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(password, salt);
    };

}