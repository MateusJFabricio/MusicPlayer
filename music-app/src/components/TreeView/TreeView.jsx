import React from 'react'
import './TreeView.css'
import TreeViewItem from './TreeViewItem/TreeViewItem'

const TreeView = ({data, onClick}) => {

    function buildItems(data, nivel, parent = []){
        return (
            <>
                {data.map((item, index)=>(
                    <TreeViewItem key={index} text={item.name} nivel={nivel} parent={parent} onClick={onClick}>
                        {item.children && buildItems(item.children, nivel + 1, [...parent, item.name])}
                    </TreeViewItem>
                ))}
            </>
        )
    }

    return (
        <div className='treeview-container'>
        {
            data&&buildItems(data, 0)
        }
        </div>
    )
}

export default TreeView