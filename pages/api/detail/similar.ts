import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function similar(perfume){
    const concen = perfume.concentration
    const gender = perfume.gender
    const scents = [perfume.first, perfume.second, perfume.third, perfume.fourth, perfume.fifth]
    const findManyOrCondition = []
    const findManyAndCondition = []

    // ===GENDER===
    findManyAndCondition.push({gender: gender})

    // ===SCENTS===
    let xCnt = 0
    let onlyFirst = false
    for(const scent of scents){
        if(scent === "xxxx") {
            xCnt++
        }
    }
    if(xCnt >= 3) onlyFirst = true

    if(onlyFirst){
        findManyAndCondition.push({first: scents[0]})
    } else {
        findManyAndCondition.push({first: scents[0]})
        findManyAndCondition.push({second: scents[1]})
    }

    // ===CONCENTRATION===
    const concenDB = await prisma.concentration.findMany()
    if(!concenDB){
        return "Error: DB - concentration"
    }

    const concenAlgo = concenDB.find(row => row['concentration'] === concen)
    const daily = concenAlgo['daily'], special = concenAlgo['specialParty']

    const sameConcens = []
    for(let i=0; i<concenDB.length; i++){
        const row = concenDB[i]
        if(row['concentration'] === concen) continue
        
        if((daily === 1 && row['daily'] === 1) ||
        (special === 1 && row['specialParty'] === 1)) sameConcens.push(row['concentration'])
    }

    for(const concen of sameConcens){
        findManyOrCondition.push({
            concentration: concen
        })
    }

    
    // ========
    const perfumes = await prisma.perfume.findMany({
        where: {
            OR: findManyOrCondition,
            AND: findManyAndCondition
        },
        take: 15
    })

    return {
        perfumes: perfumes,
    }
}