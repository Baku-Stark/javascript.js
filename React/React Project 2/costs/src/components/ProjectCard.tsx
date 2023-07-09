import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

import styles from './ProjectCard.module.css'

export function ProjectCard(
    {
        id,
        name,
        number,
        category,
        handleRemove
    }: any
){
    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p><span>Orçamento:</span> R${number}</p>
            <p className={styles.category_text}>
                <span className={styles[category.toLowerCase()]}></span> {category}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={"/"}>
                    <BsPencil/> Editar
                </Link>
                <Link to={"/"}>
                    <BsFillTrashFill/> Remover
                </Link>
            </div>
        </div>
    )
}