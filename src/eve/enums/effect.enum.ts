import { registerEnumType } from "@nestjs/graphql";

export enum Effect {
    redGiant = 'redGiant',
    cataclysmic = 'cataclysmic',
    magnetar = 'magnetar',
    pulsar = 'pulsar',
    wolfRayet = 'wolfRayet',
    blackHole = 'blackHole'
}

registerEnumType(Effect, {
    name: 'Effect',
})