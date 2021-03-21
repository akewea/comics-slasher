import { Injectable } from "@angular/core";
import { Story } from "./story.model";

@Injectable({
    providedIn: 'root'
})
export class StoryService {

    getSampleStory(): Story {
        return {
            title: 'My Lost story',
            ideas: [],
            boards: [
                {
                    uuid: 'board-1',
                    boxes: [
                        {
                            uuid: 'box-1',
                            action: 'Vue d\'ensemble depuis une hauteur sur une jungle et la mer au loin. Un "gnaw" retentit dans un coin',
                            layout: {
                                height: 6
                            }
                        },
                        {
                            uuid: 'box-2',
                            action: 'Un tintement, des oiseau s\'envolent au dessus des arbres.',
                            layout: {
                                newLine: true
                            }
                        },
                        {
                            uuid: 'box-3',
                            action: 'Le tintement provient de bout de bois/roseau suspendu à une corde'
                        },
                        {
                            uuid: 'box-4',
                            action: 'Quelqu\'un court vers le tintement (vue à raz du sol)'
                        }
                    ]
                }
            ]
        }
    }

}